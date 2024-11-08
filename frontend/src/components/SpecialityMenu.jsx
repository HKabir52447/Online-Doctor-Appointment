import React from 'react'
import { specialityData } from '../assets/assets'
import {Link} from 'react-router-dom'
import Heading from './Heading'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-600' id='speciality'>
        <Heading data-aos="fade-up" title='Category' sub_title='Find by speciality'/>
        <div className='flex justify-center gap-10 pt-3 w-full flex-wrap'>
            {specialityData.map((item,index)=>(
                <div data-aos="zoom-in"
                data-aos-delay={index * 100} className='border-2 rounded-lg w-36 h-36 flex justify-center items-center cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                  <Link onClick={()=>scrollTo(0,0)} className='w-full h-full flex flex-col items-center justify-center text-sm' to={`/doctors/${item.speciality}`}>
                    <img className='w-24 mb-2' src={item.image} alt="" />
                    <p>{item.speciality}</p>
                </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu