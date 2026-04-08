from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import asyncio
import random
import time

app = FastAPI(title="SafeWalk AI Simulation Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # Automatically start a long-running simulation on server boot
    asyncio.create_task(run_simulation(duration=360000, interval=10))

# Mock Node.js Backend URL
NODE_BACKEND_URL = "http://localhost:5000"
# Hardcoded mocked camera ID to associate alerts with
MOCK_CAMERA_ID = "60a7c4f4a3e2e811f0a05a10" # We will ignore the ID in true simulation or replace it

class SimulationRequest(BaseModel):
    duration_seconds: int = 60
    interval_seconds: int = 10

def generate_random_alert():
    alert_types = ['suspicious_activity', 'crowd_anomaly', 'distress_detected']
    return {
        "cameraId": MOCK_CAMERA_ID,
        "type": random.choice(alert_types),
        "riskScore": round(random.uniform(50, 99), 1),
        "imageUrl": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }

async def run_simulation(duration: int, interval: int):
    end_time = time.time() + duration
    while time.time() < end_time:
        alert_data = generate_random_alert()
        try:
            # Send alert to Node.js backend
            requests.post(f"{NODE_BACKEND_URL}/api/alerts", json=alert_data, timeout=5)
            print(f"Dispatched alert: {alert_data['type']} with score {alert_data['riskScore']}")
        except Exception as e:
            print(f"Failed to send alert to backend: {e}")
        
        await asyncio.sleep(interval)

@app.post("/simulate")
async def start_simulation(req: SimulationRequest, background_tasks: BackgroundTasks):
    """Starts a background process that generates random AI alerts and sends to Node backend."""
    background_tasks.add_task(run_simulation, req.duration_seconds, req.interval_seconds)
    return {"message": f"Simulation started for {req.duration_seconds} seconds"}

@app.post("/trigger-anomaly")
async def trigger_manual_anomaly():
    """Immediately triggers a single mocked anomaly alert."""
    alert_data = generate_random_alert()
    try:
        response = requests.post(f"{NODE_BACKEND_URL}/api/alerts", json=alert_data, timeout=5)
        response.raise_for_status()
        return {"message": "Anomaly triggered successfully", "alert": alert_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Backend unreachable: {str(e)}")

@app.get("/health")
def health_check():
    return {"status": "AI Service running perfectly"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
