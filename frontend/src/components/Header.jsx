import React from 'react'
import {assets} from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-green-500 rounded-lg px-6 md:px-10 lg:px-20'>
        {/* =========Left side======= */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p data-aos="fade-left" className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br />
            With Specailized Doctors 
            </p>
            <div className='text-slate-200 '>
                <p data-aos="fade-left" data-aos-delay='300'>
                    Book your appointment without any hassle, <br /> get best treatment from trusted doctors.
                </p>
            </div>
            <a data-aos="fade-left" data-aos-delay='500' className='border-2 border-white py-[6px] rounded-full px-5 text-green-500 duration-100 bg-slate-100 hover:bg-white hover:tracking-wide' href="#speciality">Book Appointment</a>
        </div>
{/* =========Right side======= */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header