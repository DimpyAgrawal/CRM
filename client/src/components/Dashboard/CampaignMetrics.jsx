import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CampaignMetrics = ({ data }) => {
  return (
    <div className="card h-96">
      <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="impressions" fill="#8884d8" name="Impressions" />
          <Bar yAxisId="right" dataKey="conversions" fill="#82ca9d" name="Conversions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};