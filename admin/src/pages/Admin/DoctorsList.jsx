import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { LifeLine } from 'react-loading-indicators'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailablity } = useContext(AdminContext)

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("") // State for search/filter
  const [filterAvailable, setFilterAvailable] = useState("") // State for availability filter

  useEffect(() => {
    if (aToken) {
      getAllDoctors().then(() => setLoading(false))
    }
  }, [aToken])

  // Filter doctors based on search term and availability
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAvailability = 
      filterAvailable === "" || 
      (filterAvailable === "available" && doctor.available) || 
      (filterAvailable === "unavailable" && !doctor.available)

    return matchesSearch && matchesAvailability
  })

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium text-center'>All Doctors</h1>

      {/* Search Bar and Availability Filter */}
      <div className='my-4 flex gap-4'>
        <input
          type="text"
          placeholder="Search by name or speciality..."
          className='p-2 border border-gray-300 rounded w-full'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className='p-2 border border-gray-300 rounded'
          value={filterAvailable}
          onChange={(e) => setFilterAvailable(e.target.value)}
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      {loading ? (
        <div className='h-[70vh] flex items-center pl-72'>
          <LifeLine color="#32cd32" size="large" text="List loading..." textColor="#32cd32" />
        </div>
      ) : (
        <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((item, index) => (
              <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                <img className='bg-green-50 group-hover:bg-green-500 transition-all duration-500' src={item.image} alt="" />
                <div className='p-4'>
                  <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                  <div className='mt-2 flex items-center gap-1 text-sm'>
                    <input onChange={() => changeAvailablity(item._id)} type="checkbox" checked={item.available} />
                    <p>Available</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-600'>No doctors found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default DoctorsList
