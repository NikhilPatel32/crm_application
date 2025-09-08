import React, { useState, useEffect } from 'react';
import { getCustomerById } from '../../services/Customer';
import { getLeadsByCustomer, createLead, updateLead, deleteLead } from '../../services/Lead';
import LeadForm from '../Leads/LeadForm';
import { Pencil, Trash2, X } from 'lucide-react';

const CustomerDetails = ({ customer, onClose }) => {
  const [customerData, setCustomerData] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    if (customer) {
      fetchCustomerDetails();
    }
  }, [customer]);

  const fetchCustomerDetails = async () => {
    try {
      const result = await getCustomerById(customer._id);
      setCustomerData(result.customer);
      setLeads(result.leads);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      const result = await getLeadsByCustomer(customer._id, filterStatus);
      setLeads(result);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(customer._id, leadId);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setShowLeadForm(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-yellow-100 text-yellow-800',
      'Converted': 'bg-green-100 text-green-800',
      'Lost': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            <X />
          </button>
        </div>

  
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">Name:</span> {customerData?.name}</p>
              <p><span className="font-medium">Email:</span> {customerData?.email}</p>
            </div>
            <div>
              <p><span className="font-medium">Phone:</span> {customerData?.phone}</p>
              <p><span className="font-medium">Company:</span> {customerData?.company}</p>
            </div>
          </div>
        </div>

      
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Leads ({leads.length})</h3>
            <button
              onClick={() => {
                setSelectedLead(null);
                setShowLeadForm(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 hover:cursor-pointer"
            >
              Add Lead
            </button>
          </div>

         
          <div className="mb-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

        
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      <div>
                        <div className="font-medium">{lead.title}</div>
                        <div className="text-sm text-gray-500">{lead.description}</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">${lead.value}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditLead(lead)}
                          className="text-blue-600 hover:text-blue-900 text-sm hover:cursor-pointer"
                        >
                          < Pencil />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="text-red-600 hover:text-red-900 text-sm hover:cursor-pointer"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {leads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No leads found for this customer.
            </div>
          )}
        </div>

       
        {showLeadForm && (
          <LeadForm
            lead={selectedLead}
            customerId={customer._id}
            onClose={() => {
              setShowLeadForm(false);
              setSelectedLead(null);
            }}
            onSuccess={() => {
              fetchLeads();
              setShowLeadForm(false);
              setSelectedLead(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
