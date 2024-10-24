const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/generate', reportController.generateReport);
router.get('/list', reportController.getReportsList);
router.get('/download/:reportId', reportController.downloadReport);
router.post('/schedule', reportController.scheduleReport);
router.get('/templates', reportController.getReportTemplates);

router.post('/create-report', reportController.createReport); // Make sure 'createReport' is defined in the controller


// Custom report endpoints

router.get('/campaign-performance', reportController.getCampaignPerformanceReport);
router.get('/lead-conversion', reportController.getLeadConversionReport);
router.get('/roi-analysis', reportController.getROIAnalysisReport);

module.exports = router;