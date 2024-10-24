const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/leads', authMiddleware, require('./routes/leadRoutes'));
app.use('/api/campaigns', authMiddleware, require('./routes/campaignRoutes'));
app.use('/api/reports', authMiddleware, require('./routes/reportRoutes'));
app.use('/api/dashboard', authMiddleware, require('./routes/dashboardRoutes'));
 
// Error handling
app.use(errorHandler); 

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-tracking')
.then(() => console.log('Connected to MongoDB')) 
.catch(err => console.error('MongoDB connection error:', err));
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;