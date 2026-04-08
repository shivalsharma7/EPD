import express from 'express';
import { Alert } from '../models/Alert.js';
import { Drone } from '../models/Drone.js';

const router = express.Router();

// Get all recent alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(50).populate('cameraId');
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new alert (Called by AI service)
router.post('/', async (req, res) => {
  try {
    const newAlert = new Alert(req.body);
    const savedAlert = await newAlert.save();
    
    // Dispatch to socket.io
    const io = req.app.get('io');
    io.emit('new_alert', savedAlert);

    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Dispatch a drone for an alert
router.post('/:id/dispatch', async (req, res) => {
  try {
    const alertId = req.params.id;
    const alert = await Alert.findById(alertId);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });

    // Find available drone
    const drone = await Drone.findOne({ status: 'available' });
    if (!drone) return res.status(400).json({ message: 'No drones available for dispatch' });

    drone.status = 'dispatched';
    drone.assignedAlertId = alertId;
    await drone.save();

    alert.status = 'resolved'; // Mark alert as being resolved or active with drone
    await alert.save();

    const io = req.app.get('io');
    io.emit('drone_dispatched', { drone, alertId });

    res.json({ message: 'Drone dispatched successfully', drone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
