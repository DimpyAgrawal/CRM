exports.getLeadStatistics = async (req, res) => {
  try {
    const stats = await Lead.aggregate([
      {
        $facet: {
          statusDistribution: [
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 }
              }
            }
          ],
          sourceDistribution: [
            {
              $group: {
                _id: '$source',
                count: { $sum: 1 }
              }
            }
          ],
          dailyLeads: [
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { '_id': -1 } },
            { $limit: 30 }
          ]
        }
      }
    ]);

    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCampaignStatistics = async (req, res) => {
  try {
    const stats = await Campaign.aggregate([
      {
        $facet: {
          performanceMetrics: [
            {
              $group: {
                _id: null,
                totalImpressions: { $sum: '$metrics.impressions' },
                totalClicks: { $sum: '$metrics.clicks' },
                totalConversions: { $sum: '$metrics.conversions' },
                avgConversionRate: {
                  $avg: {
                    $multiply: [
                      { $divide: ['$metrics.conversions', '$metrics.clicks'] },
                      100
                    ]
                  }
                }
              }
            }
          ],
          campaignStatus: [
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalBudget: { $sum: '$budget' }
              }
            }
          ],
          topPerformers: [
            {
              $project: {
                name: 1,
                conversionRate: {
                  $multiply: [
                    { $divide: ['$metrics.conversions', '$metrics.clicks'] },
                    100
                  ]
                }
              }
            },
            { $sort: { conversionRate: -1 } },
            { $limit: 5 }
          ]
        }
      }
    ]);

    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPerformanceOverview = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [leadTrends, campaignMetrics] = await Promise.all([
      Lead.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            newLeads: { $sum: 1 },
            qualifiedLeads: {
              $sum: { $cond: [{ $eq: ['$status', 'qualified'] }, 1, 0] }
            }
          }
        },
        { $sort: { '_id': 1 } }
      ]),
      Campaign.aggregate([
        {
          $match: {
            startDate: { $gte: thirtyDaysAgo }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$startDate' }
            },
            impressions: { $sum: '$metrics.impressions' },
            clicks: { $sum: '$metrics.clicks' },
            conversions: { $sum: '$metrics.conversions' }
          }
        },
        { $sort: { '_id': 1 } }
      ])
    ]);

    res.json({
      leadTrends,
      campaignMetrics
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentActivities = async (req, res) => {
  try {
    const [recentLeads, recentCampaigns] = await Promise.all([
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('campaignId', 'name'),
      Campaign.find()
        .sort({ startDate: -1 })
        .limit(5)
    ]);

    res.json({
      recentLeads,
      recentCampaigns
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrends = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trends = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            source: '$source'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          sources: {
            $push: {
              source: '$_id.source',
              count: '$count'
            }
          }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};