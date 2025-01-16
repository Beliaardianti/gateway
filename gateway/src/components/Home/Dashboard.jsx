import React from 'react';
import { Mail, Send, DollarSign, MessageSquare } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1200,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          stepSize: 300,
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };


  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    datasets: [{
      data: [505, 545, 551, 425, 405, 450, 325, 732, 695, 875, 955, 775, 785, 345],
      backgroundColor: '#4ADE80',
      borderColor: '#4ADE80',
      borderWidth: 1,
      borderRadius: 4,
      barThickness: 20,
    }]
  };

  const StatCard = ({ title, period, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{period}</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
 
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">Jan 01, 2025 - Jan 31, 2025</span>
        </div>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Spending" 
          period="Since 01/01/2025"
          icon={DollarSign}
        />
        <StatCard 
          title="Total Message" 
          period="Since 01/01/2025"
          icon={MessageSquare}
        />
        <StatCard 
          title="Message Delivered" 
          period="Since 01/01/2025"
          icon={Send}
        />
        <StatCard 
          title="Failed Message" 
          period="Since 01/01/2025"
          icon={Mail}
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Daily Submission</h2>
          <div className="h-96">
            <Bar options={options} data={data} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Latest Campaign</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-gray-500 pb-4">Name</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-4">Author</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-sm text-gray-500" colSpan="3">
                    A list of your recent campaings.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;