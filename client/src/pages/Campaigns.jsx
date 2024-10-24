import React, { useState, useEffect } from 'react';
import { campaignService } from '../services/api';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await campaignService.getCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Campaigns</h1>
        <button className="btn-primary">Create Campaign</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{campaign.name}</h3>
                <p className="text-sm text-gray-500">{campaign.platform}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Impressions</span>
                <span className="font-medium">{campaign.metrics.impressions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Clicks</span>
                <span className="font-medium">{campaign.metrics.clicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Conversions</span>
                <span className="font-medium">{campaign.metrics.conversions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">CTR</span>
                <span className="font-medium">
                  {((campaign.metrics.clicks / campaign.metrics.impressions) * 100).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Budget</span>
                <span>${campaign.budget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
