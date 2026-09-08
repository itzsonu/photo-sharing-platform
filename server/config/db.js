const mongoose = require('mongoose'); // ODM for MongoDB

const connectDB = async () => {
  try {
    // connect using URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // confirm connection host
  } catch (error) {
    console.error(`Error: ${error.message}`); // log connection error
    process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;