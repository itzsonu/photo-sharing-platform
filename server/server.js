const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config(); // load .env variables
connectDB(); // connect to MongoDB

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.get('/', (req, res) => {
  res.send('Photo Sharing API is running...');
});

app.use('/api/auth', authRoutes); 


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));