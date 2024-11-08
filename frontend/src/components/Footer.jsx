import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 text-center mt-16'>
        <div className='flex flex-col items-center mb-2'>
            <img className='mb-5 w-32' src={assets.logo} alt="" />
            <p className='text-gray-600 text-[15px]'>Best Doctors For Best Treatment</p>
        </div>

    {/* ============== copyright ============= */}
    <div>
        <hr />
        <p className='py-5 text-xs'>Copyright 2024&#169; DoctorsPoint - All Right Reserved.</p>
    </div>
    </div>
  )
}

export default Footer