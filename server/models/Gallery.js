const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const gallerySchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo', // selected photos published in this gallery
      },
    ],
    pin: {
      type: String,
      required: true, // will store HASHED pin, not plain text
    },
    linkId: {
      type: String,
      required: true,
      unique: true, // e.g. "abc123" used in /gallery/abc123
    },
    isPublished: {
      type: Boolean,
      default: false, // prevents access before publishing
    },
  },
  { timestamps: true }
);

// hash the PIN before saving, similar to password hashing
gallerySchema.pre('save', async function (next) {
  if (!this.isModified('pin')) return next(); // skip if pin unchanged
  const salt = await bcrypt.genSalt(10);
  this.pin = await bcrypt.hash(this.pin, salt);
  next();
});

// method to compare entered PIN with hashed PIN
gallerySchema.methods.matchPin = async function (enteredPin) {
  return await bcrypt.compare(enteredPin, this.pin);
};

module.exports = mongoose.model('Gallery', gallerySchema);