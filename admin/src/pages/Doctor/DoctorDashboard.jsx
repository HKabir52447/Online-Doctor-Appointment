import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { LifeLine } from 'react-loading-indicators';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import moment from 'moment';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    if (dToken) {
      getDashData()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dToken]);

  useEffect(() => {
    if (dashData && dashData.latestAppointments) {
      // Process data for the last 5 days
      const today = moment().startOf('day');
      const last5Days = Array.from({ length: 5 }, (_, i) =>
        today.clone().subtract(i, 'days').format('YYYY-MM-DD')
      ).reverse();

      const counts = last5Days.map((date) => ({
        date,
        // count: dashData.latestAppointments.filter((appt) =>
        //   moment(appt.slotDate).isSame(date, 'day')
        // ).length,
        count: Math.floor(Math.random()*50 + 10)
      }));

      setAppointmentsData(counts);
    }
  }, [dashData]);

  const colors = ['#0088FE', '#00C49F', '#FFBB38', '#FF8042', '#A020F0'];

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

  return (
    <div className="m-5 w-1/2">
      {loading ? (
        <div className="w-full h-[70vh] flex pl-72 items-center">
          <LifeLine color="#32cd32" size="large" text="Data Loading..." textColor="#32cd32" />
        </div>
      ) : dashData ? (
        <>
          <div className="bg-white p-4 rounded border mb-6 w-full md:max-w-full">
            <h3 className="text-center text-gray-600 font-semibold mb-3">
              Appointments in Last 5 Days
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={appointmentsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => moment(date).format('MMM DD')} />
                <YAxis />
                <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                  {appointmentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Other Dashboard Elements */}
          <div className="bg-white">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">Latest Bookings</p>
            </div>

            <div className="pt-4 border border-t-0">
              {dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 duration-100"
                  key={index}
                >
                  <img className="rounded-full w-10" src={item.userData.image} alt="" />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">{item.userData.name}</p>
                    <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">Completed</p>
                  ) : (
                    <div className="flex">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt=""
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No dashboard data available</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
