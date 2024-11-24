require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Example Route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Server with MongoDB!');
});

const bikeRouter = require('./routes/bikes.router.js');
app.use("/api/bikes", bikeRouter)

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
