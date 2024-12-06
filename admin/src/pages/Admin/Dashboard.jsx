import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { LifeLine } from "react-loading-indicators";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, PieChart, Pie } from 'recharts';

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      getDashData().then(() => setLoading(false));
    }
  }, [aToken]);

  // Data Configurations for Recharts 
  const colors = ['#0088FE', '#00C49F', '#FFBB28']
  const barChartData = [
    { name: 'Doctors', count: dashData?.doctors || 0 },
    { name: 'Appointments', count: dashData?.appointments || 0 },
    { name: 'Patients', count: dashData?.patients || 0 },
  ];

  const pieChartData = [
    { name: 'Doctors', value: dashData?.doctors || 0 },
    { name: 'Appointments', value: dashData?.appointments || 0 },
    { name: 'Patients', value: dashData?.patients || 0 },
  ];

  // Custom Shape for Bar Chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Colors for Pie Chart
  const COLORS = ['#32cd32', '#ffcd32', '#32a1cd'];

  return (
    <div className='m-5 w-3/4'>
      {loading ? (
        <div className='w-full h-[70vh] flex pl-72 items-center'>
          <LifeLine color="#32cd32" size="large" text="data loading..." textColor="#32cd32" />
        </div>
      ) : (
        dashData ? (
          <>
            {/* Custom Bar Chart for Statistics */}
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='bg-white p-2 rounded border mb-6 w-full md:max-w-1/2'>
                <h3 className='text-center text-gray-600 font-semibold mb-3'>Dashboard Statistics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    // width={500}
                    // height={300}
                    data={barChartData}
                    margin={{
                      top: 20,
                      right: 20,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis className='text-xs' dataKey="name" />
                    <YAxis />
                    <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                      {barChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart for Visualizing Data */}
              <div className='bg-white p-5 rounded border w-full md:max-w-1/2'>
                <h3 className='text-center text-gray-600 font-semibold mb-3'>Distribution of Data</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Latest Bookings Section */}
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
