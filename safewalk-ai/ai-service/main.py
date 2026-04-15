import cv2
import base64
import requests
import asyncio
import random
import time
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

app = FastAPI(title="SafeWalk AI Surveillance Stream")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ROBOFLOW_API_KEY = "ynV6tKlSckKbE1ZsCjke"
ROBOFLOW_WORKSPACE = "project-plfrl"
ROBOFLOW_WORKFLOW = "detect-and-classify"
NODE_BACKEND_URL = "http://localhost:5000"
VIDEO_PATH = "demo.mp4"

def infer_roboflow(frame_b64):
    url = f"https://detect.roboflow.com/infer/workflows/{ROBOFLOW_WORKSPACE}/{ROBOFLOW_WORKFLOW}?api_key={ROBOFLOW_API_KEY}"
    payload = {
        "inputs": {
            "image": {"type": "base64", "value": frame_b64}
        }
    }
    try:
        res = requests.post(url, json=payload, timeout=5)
        if res.status_code == 200:
            return res.json()
        print(f"Roboflow API error: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"Failed to connect to Roboflow: {e}")
    return None

def trigger_backend_alert(predictions):
    # This checks if any detected class has high confidence and triggers our Node dashboard
    # Replace these match conditions with your actual output structure from your workflow
    alert_types = ['suspicious_activity', 'crowd_anomaly', 'distress_detected']
    
    # We will trigger a random alert for demo if a prediction exists
    alert_data = {
        "cameraId": "60a7c4f4a3e2e811f0a05a10",
        "type": random.choice(alert_types),
        "riskScore": round(random.uniform(70, 99), 1),
        "imageUrl": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
    }
    try:
        requests.post(f"{NODE_BACKEND_URL}/api/alerts", json=alert_data, timeout=2)
        print(f"Dispatched alert to dashboard!")
    except Exception as e:
        print(f"Failed to send alert to backend dashboard: {e}")

async def video_stream():
    cap = cv2.VideoCapture(VIDEO_PATH)
    if not cap.isOpened():
        print("Error: Could not open demo.mp4. Make sure it exists in the ai-service folder.")
        # Stream a black frame if video missing
        while True:
            img = np.zeros((480, 640, 3), dtype=np.uint8)
            cv2.putText(img, "demo.mp4 NOT FOUND", (50, 240), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)
            _, buffer = cv2.imencode('.jpg', img)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
            await asyncio.sleep(1)
            
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    frame_interval = 1.0 / fps
    frame_count = 0
    
    last_infer_time = time.time()
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0) # loop video
            continue
            
        current_time = time.time()
        
        # Only ping Roboflow API every 1-2 seconds to save requests / speed up local UI
        if current_time - last_infer_time > 2.0:
            last_infer_time = current_time
            print("Sending frame to Roboflow Inference...")
            
            # encode
            _, buffer = cv2.imencode('.jpg', frame)
            b64_str = base64.b64encode(buffer).decode('utf-8')
            
            # run inference
            result = infer_roboflow(b64_str)
            if result and type(result) == list and len(result) > 0:
                print("Roboflow Detections: ", result)
                # optionally parse bounding boxes here and draw onto the `frame`
                # e.g., result[0]["predictions"] -> trigger_backend_alert()
                trigger_backend_alert(result)
            
        # Optional: draw some techy overlay
        cv2.putText(frame, f"AI Stream ACTIVE - FPS: {fps}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
               
        await asyncio.sleep(frame_interval)
        
@app.get("/stream")
def stream_video():
    """MJPEG stream endpoint for the React Frontend"""
    return StreamingResponse(video_stream(), media_type="multipart/x-mixed-replace; boundary=frame")

@app.post("/trigger-anomaly")
async def trigger_manual_anomaly():
    """Immediate mock trigger for Viva emergency"""
    trigger_backend_alert({})
    return {"message": "Anomaly triggered locally."}

@app.get("/health")
def health_check():
    return {"status": "AI Service running perfectly"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
