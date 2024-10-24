const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.post('/', campaignController.createCampaign);
router.get('/metrics', campaignController.getCampaignMetrics);

module.exports = router;