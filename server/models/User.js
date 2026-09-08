const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // name is mandatory
    },
    email: {
      type: String,
      required: true,
      unique: true, // no duplicate emails allowed
    },
    password: {
      type: String,
      required: true, // will store hashed password
    },
    role: {
      type: String,
      enum: ['admin', 'member'], // only these two roles allowed
      default: 'member', // default role is team member
    },
  },
  { timestamps: true } // adds createdAt, updatedAt automatically
);

module.exports = mongoose.model('User', userSchema);