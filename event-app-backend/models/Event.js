// models/Event.js
const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  role: { type: String, enum: ['host', 'guest'], default: 'guest' },
  status: { type: String, enum: ['confirmed', 'pending', 'declined'], default: 'pending' },
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true }, // store full datetime
  location: String,
  category: String,
  capacity: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [attendeeSchema],
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
