import mongoose from 'mongoose';

const cameraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String }
  },
  status: { type: String, enum: ['online', 'offline', 'maintenance'], default: 'online' },
  streamUrl: { type: String },
  resolution: { type: String, default: '1080p' }
});

export const Camera = mongoose.model('Camera', cameraSchema);
