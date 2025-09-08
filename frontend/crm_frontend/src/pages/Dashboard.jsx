import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/Lead';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const result = await getDashboardData();
      setData(result);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  const pieChartData = {
    labels: Object.keys(data?.statusCount || {}),
    datasets: [
      {
        data: Object.values(data?.statusCount || {}),
        backgroundColor: [
          '#3B82F6', // for Blue color
          '#10B981', // for Green color
          '#F59E0B', // for Yellow color
          '#EF4444', // for Red color
        ],
      },
    ],
  };

  const barChartData = {
    labels: ['Customers', 'Leads', 'Total Value ($)'],
    datasets: [
      {
        label: 'CRM Statistics',
        data: [
          data?.stats?.totalCustomers || 0,
          data?.stats?.totalLeads || 0,
          data?.stats?.totalValue || 0,
        ],
        backgroundColor: '#3B82F6',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your CRM overview</p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Total Customers</h3>
          <p className="text-3xl font-bold text-blue-600">{data?.stats?.totalCustomers || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Total Leads</h3>
          <p className="text-3xl font-bold text-green-600">{data?.stats?.totalLeads || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Total Value</h3>
          <p className="text-3xl font-bold text-yellow-600">${data?.stats?.totalValue || 0}</p>
        </div>
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Status Distribution</h3>
          <div className="w-full h-64">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">CRM Overview</h3>
          <div className="w-full h-64">
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

  
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/customers"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Manage Customers
          </Link>
          <button 
            onClick={fetchDashboardData}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

