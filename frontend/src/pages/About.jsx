import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-3xl pt-10 text-gray-900'>
        <h1 data-aos='zoom-in' className='font-medium'>About Us</h1>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img data-aos='fade-right' className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div data-aos='fade-left' className='flex flex-col justify-center gap-3 md:-2/4 text-sm text-gray-600'>
          <p>Welcome to DoctorsPoint, your trusted partner in managing your healthcare needs conveniently and efficiently. At DoctorsPoint, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>

          <p>DoctorsPoint is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, DoctorsPoint is here to support you every step of the way.</p>

          <b className='text-gray-700 text-base'>Our Vision</b>
          <p>Our vision at DoctorsPoint is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <h2 data-aos="fade-up" className='text-gray-700 font-semibold'>Why Choose us</h2>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div data-aos="fade-right" className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div data-aos="fade-up" className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div data-aos="fade-left" className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About