import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => { applyFilter() }, [doctors, speciality])

  return (
    <div>
      <h2 data-aos="fade-up" className='text-center py-2 text-gray-600'>See all doctors by speciality</h2>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-16'>

        <button
          data-aos="fade-right"
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-green-500 text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}
          data-aos="fade-up"
        >
          {['Medicine', 'Gynecology', 'Dermatology', 'Pediatrics', 'Neurology', 'Gastroenterology', 'Orthopedic'].map((spec, index) => (
            <p
              key={spec}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-300 cursor-pointer ${speciality === spec ? 'bg-green-100 text black' : ''}`}
              data-aos="fade-right"
              data-aos-delay={index * 200}  // add staggered delay for each item
            >
              {spec}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-16'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              className='group flex flex-col items-center cursor-pointer border-2 rounded-lg py-5 sm:px-4 px-2 group'
              data-aos="fade-up"
              data-aos-delay={index * 100}  // add delay for staggered animation
            >
              <div className='bg-white p-1 w-[130px] h-[130px] rounded-full border-[3px] border-x-green-500 border-y-red-500 overflow-hidden group-hover:rotate-90 transition-all duration-300 absolute translate-y-[-70px] shadow-lg'>
                <img
                  className='w-full h-full rounded-full bg-green-500 group-hover:-rotate-90 transition-all duration-300'
                  src={item.image}
                  alt=""
                />
              </div>
              <div className='p-y-4 px-0 mt-16'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-400' : 'text-gray-500'} mt-3`}>
                  <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='font-semibold'>{item.name}</p>
                <p className='mb-3 text-sm text-gray-400'>{item.speciality}</p>
                <div className='flex justify-center'>
                  <button
                    onClick={() => navigate(`/appointment/${item._id}`)}
                    className="text-sm font-semibold border-2 border-transparent py-1 sm:px-4 bg-green-500 text-white duration-100 hover:bg-white hover:text-green-500 hover:border-green-500 px-2"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Doctors