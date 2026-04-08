import mongoose from 'mongoose';

const droneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['available', 'dispatched', 'charging', 'maintenance'], default: 'available' },
  batteryLevel: { type: Number, default: 100 },
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  assignedAlertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert', default: null }
});

export const Drone = mongoose.model('Drone', droneSchema);
