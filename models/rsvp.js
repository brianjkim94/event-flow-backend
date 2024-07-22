const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registration: { type: Boolean, required: true, default: true }
}, { timestamps: true });

const RSVP = mongoose.model('RSVP', rsvpSchema);
module.exports = RSVP;
