import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Heading from './Heading'

const RelatedDoctors = ({docId, speciality}) => {

    const {doctors} =useContext(AppContext)
    const navigate = useNavigate()

    const [relDoc, setRelDoc] = useState([])

    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const docData = doctors.filter((doc) => doc.speciality === speciality && doc._id !==docId)
            setRelDoc(docData)
        }
    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 md:mx10 mt-4'>
        <Heading title='Related Doctors' sub_title='Best doctors for best treatment'/>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-16 px-3 sm:px-0'>
        {
            relDoc.slice(0,5).map((item,index)=>(
                <div key={index} className='group flex flex-col items-center cursor-pointer border-2 rounded-lg py-5 sm:px-4 px-2 group'>
                    <div className='bg-white p-1 w-[130px] h-[130px] rounded-full border-[3px] border-x-green-500 border-y-red-500 overflow-hidden group-hover:rotate-90 transition-all duration-300 absolute translate-y-[-70px] shadow-lg'>
                    <img className='w-full h-full rounded-full bg-green-500 group-hover:-rotate-90 transition-all duration-300' src={item.image} alt="" />
                    </div>
                    <div className='p-y-4 px-0 mt-16'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-400' : 'text-gray-500'} mt-3`}>
                        <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available': 'Not Available'}</p>
                    </div>
                    <p className='font-semibold'>{item.name}</p>
                    <p className='mb-3 text-sm text-gray-400'>{item.speciality}</p>
                    <div className='flex justify-center'>
                    <button onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className="text-sm font-semibold border-2 border-transparent py-1 sm:px-4 bg-green-500 text-white duration-100 hover:bg-white hover:text-green-500 hover:border-green-500">
          Book Now
        </button>
                    </div>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default RelatedDoctors