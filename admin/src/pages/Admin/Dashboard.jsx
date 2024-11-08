import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { LifeLine } from "react-loading-indicators";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      getDashData().then(() => setLoading(false));
    }
  }, [aToken]);

  // Chart Data Configurations
  const barChartData = {
    labels: ['Doctors', 'Appointments', 'Patients'],
    datasets: [
      {
        label: 'Count',
        data: [dashData?.doctors || 0, dashData?.appointments || 0, dashData?.patients || 0],
        backgroundColor: ['#32cd32', '#ffcd32', '#32a1cd'],
        borderColor: ['#2e8b57', '#cc8e00', '#1e5d85'],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Doctors', 'Appointments', 'Patients'],
    datasets: [
      {
        data: [dashData?.doctors || 0, dashData?.appointments || 0, dashData?.patients || 0],
        backgroundColor: ['#32cd32', '#ffcd32', '#32a1cd'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className='m-5 w-3/4'>
      {loading ? (
        <div className='w-full h-[70vh] flex pl-72 items-center'>
          <LifeLine color="#32cd32" size="large" text="Doctors Point" textColor="" />
        </div>
      ) : (
        dashData ? (
          <>
            {/* Bar Chart for Statistics */}
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='bg-white p-5 rounded border mb-6'>
                <h3 className='text-center text-gray-600 font-semibold mb-3'>Dashboard Statistics</h3>
                <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </div>

              {/* Pie Chart for Visualizing Data */}
              <div className='bg-white p-5 rounded border'>
                <h3 className='text-center text-gray-600 font-semibold mb-3'>Distribution of Data</h3>
                <Pie data={pieChartData} options={{ responsive: true }} />
              </div>
            </div>


            <div className='bg-white'>
              <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                <img src={assets.list_icon} alt="" />
                <p className='font-semibold'>Latest Bookings</p>
              </div>
              <div className='pt-4 border border-t-0'>
                {dashData.latestAppointments.map((item, index) => (
                  <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 duration-100' key={index}>
                    <img className='rounded-full w-10' src={item.docData.image} alt="" />
                    <div className='flex-1 text-sm'>
                      <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                      <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                    </div>
                    {item.cancelled ? (
                      <p className='text-red-400 text-xm font-medium'>Cancelled</p>
                    ) : item.isCompleted ? (
                      <p className='text-green-500 text-xm font-medium'>Completed</p>
                    ) : (
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className='text-center text-gray-500'>No dashboard data available</p>
        )
      )}
    </div>
  );
};

export default Dashboard;
