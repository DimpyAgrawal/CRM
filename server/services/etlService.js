class ETLService {
    static async transformLeadData(rawLeads) {
      return rawLeads.map(lead => ({
        id: lead._id,
        fullName: lead.name,
        contactInfo: {
          email: lead.email,
          phone: lead.phone
        },
        status: lead.status,
        source: lead.source,
        campaignInfo: lead.campaignId,
        metrics: {
          daysInPipeline: Math.floor((new Date() - lead.createdAt) / (1000 * 60 * 60 * 24)),
          lastUpdated: lead.updatedAt
        }
      }));
    }
  
    static async transformCampaignData(rawCampaigns) {
      return rawCampaigns.map(campaign => ({
        id: campaign._id,
        campaignName: campaign.name,
        performance: {
          conversionRate: this.calculateConversionRate(campaign),
          clickThroughRate: this.calculateCTR(campaign),
          roi: this.calculateROI(campaign)
        },
        status: campaign.status,
        duration: {
          start: campaign.startDate,
          end: campaign.endDate,
          daysRunning: this.calculateDaysRunning(campaign)
        },
        budget: {
          total: campaign.budget,
          spent: this.calculateSpentBudget(campaign),
          remaining: campaign.budget - this.calculateSpentBudget(campaign)
        }
      }));
    }
  
    static calculateConversionRate(campaign) {
      return campaign.metrics.clicks > 0 
        ? (campaign.metrics.conversions / campaign.metrics.clicks * 100).toFixed(2)
        : 0;
    }
  
    static calculateCTR(campaign) {
      return campaign.metrics.impressions > 0
        ? (campaign.metrics.clicks / campaign.metrics.impressions * 100).toFixed(2)
        : 0;
    }
  
    static calculateROI(campaign) {
      const revenue = campaign.metrics.conversions * 100; // Assuming $100 per conversion
      const cost = this.calculateSpentBudget(campaign);
      return cost > 0 ? ((revenue - cost) / cost * 100).toFixed(2) : 0;
    }
  
    static calculateDaysRunning(campaign) {
      const start = new Date(campaign.startDate);
      const end = campaign.status === 'completed' 
        ? new Date(campaign.endDate)
        : new Date();
      return Math.floor((end - start) / (1000 * 60 * 60 * 24));
    }
  
    static calculateSpentBudget(campaign) {
      const daysRunning = this.calculateDaysRunning(campaign);
      const dailyBudget = campaign.budget / 30; // Assuming monthly budget
      return Math.min(campaign.budget, daysRunning * dailyBudget);
    }
  }
  