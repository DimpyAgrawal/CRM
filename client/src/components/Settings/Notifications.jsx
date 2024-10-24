import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
  const [settings, setSettings] = useState({
    newLeads: true,
    leadUpdates: true,
    campaignAlerts: true,
    reportSummaries: false,
    emailDigest: 'daily'
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <Bell className="w-6 h-6 text-primary-600 mr-3" />
        <h3 className="text-lg font-semibold">Notification Settings</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">New Lead Alerts</h4>
            <p className="text-sm text-gray-500">Get notified when new leads are added</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.newLeads}
              onChange={(e) => handleChange('newLeads', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Lead Status Updates</h4>
            <p className="text-sm text-gray-500">Notifications for lead status changes</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.leadUpdates}
              onChange={(e) => handleChange('leadUpdates', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium mb-2">Email Digest Frequency</h4>
          <select
            className="input-field"
            value={settings.emailDigest}
            onChange={(e) => handleChange('emailDigest', e.target.value)}
          >
            <option value="daily">Daily Summary</option>
            <option value="weekly">Weekly Summary</option>
            <option value="monthly">Monthly Summary</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button className="btn-primary w-full">Save Settings</button>
      </div>
    </div>
  );
};