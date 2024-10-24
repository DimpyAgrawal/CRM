const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/metrics', dashboardController.getDashboardMetrics);
router.get('/lead-stats', dashboardController.getLeadStatistics);
router.get('/campaign-stats', dashboardController.getCampaignStatistics);
router.get('/performance-overview', dashboardController.getPerformanceOverview);
router.get('/recent-activities', dashboardController.getRecentActivities);
router.get('/trends', dashboardController.getTrends);

module.exports = router;