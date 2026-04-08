import express from 'express';
import { Camera } from '../models/Camera.js';
import { Drone } from '../models/Drone.js';
import { Alert } from '../models/Alert.js';
import { Incident } from '../models/Incident.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const camerasCount = await Camera.countDocuments();
    const dronesCount = await Drone.countDocuments();
    const activeAlerts = await Alert.countDocuments({ status: 'active' });
    const resolvedIncidents = await Incident.countDocuments({ status: 'resolved' });

    res.json({
      cameras: camerasCount || 24, // fallback for demo
      drones: dronesCount || 5, // fallback
      activeAlerts,
      resolvedIncidents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
