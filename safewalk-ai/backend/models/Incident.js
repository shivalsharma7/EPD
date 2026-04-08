import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  alertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert', required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  status: { type: String, enum: ['investigating', 'resolved', 'closed'], default: 'investigating' },
  reportedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }
});

export const Incident = mongoose.model('Incident', incidentSchema);
