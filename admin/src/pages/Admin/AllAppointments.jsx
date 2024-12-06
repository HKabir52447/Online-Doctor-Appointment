import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { LifeLine } from "react-loading-indicators"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  const [loading, setLoading] = useState(true)
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [startDate, setStartDate] = useState(null) // Start date for range filtering
  const [endDate, setEndDate] = useState(null) // End date for range filtering

  useEffect(() => {
    if (aToken) {
      getAllAppointments().then(() => setLoading(false))
    }
  }, [aToken])

  useEffect(() => {
    // Filter appointments based on date range
    if (startDate || endDate) {
      const filtered = appointments.filter((appointment) => {
        const appointmentDate = parseCustomDate(appointment.slotDate) // Convert custom date format
        if (startDate && endDate) {
          return appointmentDate >= startDate && appointmentDate <= endDate
        }
        if (startDate) {
          return appointmentDate >= startDate
        }
        if (endDate) {
          return appointmentDate <= endDate
        }
        return true
      })
      setFilteredAppointments(filtered)
    } else {
      setFilteredAppointments(appointments)
    }
  }, [appointments, startDate, endDate])

  // Function to parse custom date format "25_10_2024" into a JavaScript Date object
  const parseCustomDate = (customDate) => {
    const [day, month, year] = customDate.split("_").map(Number) // Split and convert to numbers
    return new Date(year, month - 1, day) // Create Date object (month is zero-based)
  }

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium text-center'>All Appointments</p>

      {/* Date Range Filters */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <DatePicker
          className="p-2 border rounded"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          dateFormat="yyyy-MM-dd"
        />
        <DatePicker
          className="p-2 border rounded"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          dateFormat="yyyy-MM-dd"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            setStartDate(null)
            setEndDate(null)
          }}
        >
          Clear Filter
        </button>
      </div>

      {/* Appointment Count */}
      <div className="mb-4 text-lg font-medium">
        Total Appointments: {filteredAppointments.length}
      </div>

      {/* Appointments Table */}
      {loading ? (
        <div className='w-full h-[70vh] flex justify-center items-center'>
          <LifeLine color="#32cd32" size="large" text="Appointments loading..." textColor="#32cd32" />
        </div>
      ) : (
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

          {filteredAppointments.map((item, index) => (
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
      )}
    </div>
  )
}

export default AllAppointments
