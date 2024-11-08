import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-3xl pt-10 text-gray-900'>
        <h1 data-aos="zoom-in" className='font-medium'>Contact Us</h1>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 justify-center'>
        <img data-aos="fade-right" className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div data-aos="fade-left" className='flex flex-col justify-center items-start gap-1 text-sm text-gray-600'>
          <b className='text-base text-[20px]'>Address</b>
          <br />
          <p>28, Doyagonj (Hut lane),<br />Gandaria, Dhaka-1204.</p>
          <br />
          <p>
            <span className='font-semibold'>Phone No.</span> <br /> 0123456789,<br />02-47118927, <br /> 02-34689690,
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact