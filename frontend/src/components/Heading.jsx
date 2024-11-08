import React from 'react'

const Heading = (props) => {
    const{sub_title, title} = props;
  return (
    <div className='text-center pb-8'>
        <h1 data-aos="fade-left" className='text-3xl font-semibold text-blue-900 pb-1'>{title}</h1>
        <h3 data-aos="fade-right" className='text-xs text-gray-600'>{sub_title}</h3>
    </div>
  )
}

export default Heading