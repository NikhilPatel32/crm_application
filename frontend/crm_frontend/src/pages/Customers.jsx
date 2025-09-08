import React, { useState, useEffect } from 'react';
import { getAllCustomers, deleteCustomer } from '../services/Customer';
import CustomerForm from '../components/Customers/CustomerForm';
import CustomerDetails from '../components/Customers/CustomerDetails';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, search]);

  const fetchCustomers = async () => {
    try {
      const result = await getAllCustomers(currentPage, search);
      setCustomers(result);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(customerId);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading customers...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => {
            setSelectedCustomer(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 hover:cursor-pointer transition-colors"
        >
          Add Customer
        </button>
      </div>

   
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

    
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.customers?.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleView(customer)}
                    className="text-blue-600 hover:text-blue-900 hover:cursor-pointer"
                  >
                    <Eye />
                  </button>
                  <button
                    onClick={() => handleEdit(customer)}
                    className="text-green-600 hover:text-green-900 hover:cursor-pointer"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  
      {customers.pages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: customers.pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

     
      {showForm && (
        <CustomerForm
          customer={selectedCustomer}
          onClose={() => {
            setShowForm(false);
            setSelectedCustomer(null);
          }}
          onSuccess={() => {
            fetchCustomers();
            setShowForm(false);
            setSelectedCustomer(null);
          }}
        />
      )}

      {showDetails && (
        <CustomerDetails
          customer={selectedCustomer}
          onClose={() => {
            setShowDetails(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default Customers;
