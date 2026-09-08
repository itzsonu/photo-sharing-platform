const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config(); // load .env variables
connectDB(); // connect to MongoDB

const app = express();

app.use(cors()); // allow cross-origin requests from React frontend
app.use(express.json()); // parse incoming JSON requests

// test route to confirm server is running
app.get('/', (req, res) => {
  res.send('Photo Sharing API is running...');
});

// error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));