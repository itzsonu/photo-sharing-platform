const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // e.g. "Arjun & Priya Wedding"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // reference to the Admin who created it
      required: true,
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // array of Team Member IDs assigned to this event
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);