import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  cameraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Camera', required: true },
  type: { type: String, enum: ['suspicious_activity', 'crowd_anomaly', 'distress_detected'], required: true },
  riskScore: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'resolved', 'ignored'], default: 'active' },
  imageUrl: { type: String }
});

export const Alert = mongoose.model('Alert', alertSchema);
