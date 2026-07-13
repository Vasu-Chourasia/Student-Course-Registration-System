const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', async (req, res) => {
  try {
    // Ping database
    await db.query('SELECT 1');
    res.json({
      status: 'ok',
      message: 'Server is running',
      db: 'connected',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server is running, but database connection failed',
      db: 'disconnected',
      error: error.message,
      timestamp: new Date()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
