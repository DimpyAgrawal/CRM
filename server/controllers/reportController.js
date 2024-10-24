const Report = require('../models/Report');
const Campaign = require('../models/Campaign');
const Lead = require('../models/Lead');
const { generatePDFReport, generateCSVReport } = require('../utils/reportGenerator');
const { scheduleJob } = require('../utils/scheduler');


exports.createReport = (req, res) => {
    // Your logic for creating a report
    res.status(200).send('Report created successfully');
  };
  
exports.getReportsList = async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ dateGenerated: -1 })
      .limit(10);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.downloadReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    if (report.format === 'pdf') {
      return generatePDFReport(report.data, res);
    } else {
      return generateCSVReport(report.data, res);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.scheduleReport = async (req, res) => {
  try {
    const { reportType, schedule, recipients, filters } = req.body;
    
    const job = await scheduleJob({
      type: 'report',
      schedule,
      data: {
        reportType,
        filters,
        recipients
      }
    });

    res.json({ message: 'Report scheduled successfully', jobId: job.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCampaignPerformanceReport = async (req, res) => {
  try {
    const performance = await Campaign.aggregate([
      {
        $lookup: {
          from: 'leads',
          localField: '_id',
          foreignField: 'campaignId',
          as: 'leads'
        }
      },
      {
        $project: {
          name: 1,
          type: 1,
          metrics: 1,
          leadCount: { $size: '$leads' },
          conversionRate: {
            $multiply: [
              {
                $cond: [
                  { $gt: ['$metrics.clicks', 0] },
                  { $divide: ['$metrics.conversions', '$metrics.clicks'] },
                  0
                ]
              },
              100
            ]
          },
          cost: '$budget',
          roi: {
            $multiply: [
              {
                $subtract: [
                  { $multiply: ['$metrics.conversions', 100] }, // Assuming $100 per conversion
                  '$budget'
                ]
              },
              100
            ]
          }
        }
      }
    ]);

    const report = new Report({
      type: 'campaign-performance',
      data: performance,
      format: req.query.format || 'pdf'
    });
    await report.save();

    if (req.query.format === 'csv') {
      return generateCSVReport(performance, res);
    }
    return generatePDFReport(performance, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLeadConversionReport = async (req, res) => {
  try {
    const conversions = await Lead.aggregate([
      {
        $group: {
          _id: {
            status: '$status',
            source: '$source'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.source',
          conversions: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          },
          totalLeads: { $sum: '$count' }
        }
      }
    ]);

    const report = new Report({
      type: 'lead-conversion',
      data: conversions,
      format: req.query.format || 'pdf'
    });
    await report.save();

    if (req.query.format === 'csv') {
      return generateCSVReport(conversions, res);
    }
    return generatePDFReport(conversions, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
