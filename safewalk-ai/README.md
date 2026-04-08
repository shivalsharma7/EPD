# SafeWalk AI Platform

SafeWalk AI is a comprehensive, production-ready smart city safety platform that uses predictive AI and computer vision to monitor live camera feeds, trigger real-time alerts for suspicious activities or crowd anomalies, and dispatch drone units proactively.

## Features
- **Predictive AI Engine**: Mocked Python backend that simulates computer vision detection.
- **Real-Time Command Center**: React dashboard with Mapbox/Leaflet integration showing active alerts and live stats.
- **Live WebSocket Integration**: Alerts stream natively from the AI microservice through the Node.js backend to the dashboard in real-time.
- **Drone Dispatch System**: Automated assignment and tracking of drone fleets.

## Architecture & Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router, Socket.io-client, React Leaflet
- **Backend**: Node.js, Express, Socket.io, Mongoose (MongoDB)
- **AI Service**: Python, FastAPI, Requests

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- MongoDB (Running locally on `mongodb://localhost:27017` or update `MONGODB_URI` in backend env)

### 1. Start the Node.js Backend
```bash
cd backend
npm install
node index.js
```
The backend API and Socket.io server will start on `http://localhost:5000`.

### 2. Start the Python AI Service Simulator
Open a new terminal:
```bash
cd ai-service
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt # (or pip install fastapi uvicorn pydantic requests)
python main.py
```
The FastAPI mockup will run on `http://localhost:8000`. You can trigger a mock anomaly by sending a POST request to `http://localhost:8000/trigger-anomaly`, or use the `/simulate` endpoint.

### 3. Start the React Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The React app will start on `http://localhost:5173`. 
Navigate to `/dashboard` to see the live Map and connect to the web-socket.

## Simulating Real-time Events
While on the Live Demo or Dashboard page, you can simulate an event by running:
```bash
curl -X POST http://localhost:8000/trigger-anomaly
```
Watch as the dashboard instantly updates highlighting the active hotspot on the map and populating the incident logs.
