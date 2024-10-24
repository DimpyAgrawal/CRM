const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getCampaignMetrics = async (req, res) => {
    try {
      const metrics = await Campaign.aggregate([
        {
          $group: {
            _id: null,
            totalImpressions: { $sum: '$metrics.impressions' },
            totalClicks: { $sum: '$metrics.clicks' },
            totalConversions: { $sum: '$metrics.conversions' }
          }
        }
      ]);
      res.json(metrics[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };