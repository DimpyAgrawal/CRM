import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import LeadTable from '../components/Leads/LeadTable';
import LeadForm from '../components/Leads/LeadForm';
import { leadService } from '../services/api';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await leadService.getLeads();
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedLead) {
        await leadService.updateLead(selectedLead._id, formData);
      } else {
        await leadService.createLead(formData);
      }
      fetchLeads();
      setIsFormOpen(false);
      setSelectedLead(null);
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadService.deleteLead(id);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Leads</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Lead
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <LeadTable
          leads={leads}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setSelectedLead(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <LeadForm
              onSubmit={handleSubmit}
              initialData={selectedLead}
            />
          </div>
        </div>
      )}
    </div>
  );
};
