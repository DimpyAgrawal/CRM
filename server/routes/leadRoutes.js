// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController'); // Ensure this path is correct

// Example routes
router.get('/', leadController.getLeads);  // Make sure getLeads exists in leadController
router.post('/', leadController.createLead);  // Make sure createLead exists in leadController

module.exports = router;
