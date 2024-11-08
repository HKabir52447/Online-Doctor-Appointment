import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { LifeLine } from "react-loading-indicators";

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (aToken) {
      getAllAppointments().then(() => setLoading(false))
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium text-center'>All Appointments</p>

      {
        loading ? <div className='w-full h-[70vh] flex justify-center items-center'>
          <LifeLine color="#32cd32" size="large" text="Doctors Point" textColor="" />
        </div>
        :
        <>
        <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {
          appointments.map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-green-200' src={item.docData.image} alt="" />
                <p>{item.docData.name}</p>
              </div>
              <p>{currency} {item.amount}</p>
              {item.cancelled ?
                <p className='text-red-400 text-xm font-medium'>Cancelled</p>
                : item.isCompleted ?
                  <p className='text-green-500 text-xm font-medium'>Completed</p>
                  :
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }

            </div>
          ))
        }

      </div>
        </>
      }

      
    </div>
  )
}

export default AllAppointments