import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointment = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () =>{
    try {
      
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers: {token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId) =>{
    try {
      
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers: {token}});

      if(data.success){
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData()
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() =>{
    if(token){
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <h1 className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</h1>
      <div>
        {
          appointments.slice(0, 2).map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-green-100' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold text-[17px]'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <br />
                <p className='text-xs mt-3'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-green-300 hover:bg-green-500 hover:text-white transition-all duration-300'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm border-red-300 text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
                {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 text-red-500'>Appointment cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment