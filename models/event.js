const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  category: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rsvp: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RSVP', default: null }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: null }]
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
