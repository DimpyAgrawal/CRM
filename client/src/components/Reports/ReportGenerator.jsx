import React, { useState } from 'react';
import { FileText, Download, Mail } from 'lucide-react';
import { leadService } from '../../services/api';

const ReportGenerator = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleDownload = async (format) => {
    try {
      setLoading(true);
      const response = await leadService.generateReport(format, dateRange);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads-report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Generate Report</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            className="input-field"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            className="input-field"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleDownload('pdf')}
          disabled={loading}
          className="btn-secondary flex items-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          PDF
        </button>
        <button
          onClick={() => handleDownload('csv')}
          disabled={loading}
          className="btn-secondary flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          CSV
        </button>
        <button
          onClick={() => handleDownload('email')}
          disabled={loading}
          className="btn-secondary flex items-center"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Report
        </button>
      </div>
    </div>
  );
};