const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event', // which event this photo belongs to
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // team member who uploaded
      required: true,
    },
    filename: {
      type: String,
      required: true, // original file name
    },
    storageLocation: {
      type: String,
      required: true, // S3/Cloudinary URL, NOT the file itself
    },
    fileSize: {
      type: Number, // size in bytes
    },
    isSelected: {
      type: Boolean,
      default: false, // whether admin selected it for gallery
    },
  },
  { timestamps: true } // createdAt used as "Created At" field
);

module.exports = mongoose.model('Photo', photoSchema);