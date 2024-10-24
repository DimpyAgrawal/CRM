import React from 'react';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import LeadChart from '../components/Dashboard/LeadChart';
import CampaignMetrics from '../components/Dashboard/CampaignMetrics';
import ReportGenerator from '../components/Reports/ReportGenerator';

const Dashboard = () => {
  const stats = [
    { title: 'Total Leads', value: '2,543', icon: Users, trend: 12.5 },
    { title: 'Conversion Rate', value: '35.8%', icon: TrendingUp, trend: -2.4 },
    { title: 'Revenue', value: '$45,678', icon: DollarSign, trend: 8.7 },
    { title: 'Active Campaigns', value: '12', icon: Target, trend: 0 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadChart 
          data={[
            { date: '2024-01', conversion: 65 },
            { date: '2024-02', conversion: 75 },
            { date: '2024-03', conversion: 85 },
            // Add more data points
          ]} 
        />
        
        <div className="card h-96">
          <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
          {/* Add campaign performance chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  <ReportGenerator />
  <CampaignMetrics data={campaignData} />
</div>
        </div>
      </div>
    </div>
  );
};