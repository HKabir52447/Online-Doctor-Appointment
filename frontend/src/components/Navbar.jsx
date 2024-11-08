import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const [showMenu, setShowmenu] = useState(false)
    const {token, setToken, userData} = useContext(AppContext)

    const logout = () =>{
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between py-3 border-b border-b-gray-400 mb-4 text-md'>
            <img onClick={() => navigate('/')} className='w-28 cursor-pointer' src={assets.logo} alt="logo" />
            <ul className='hidden md:flex items-center gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-green-500 w-3/5 m-auto hidden' />

                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>All Doctors</li>
                    <hr className='border-none outline-none h-0.5 bg-green-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>About</li>
                    <hr className='border-none outline-none h-0.5 bg-green-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>Contact</li>
                    <hr className='border-none outline-none h-0.5 bg-green-500 w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token && userData ? <div className='flex items-center cursor-pointer gap-2 group relative'>
                        <img className='w-8 rounded-full' src={userData.image} alt="" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                        <div className='absolute top-0 right-0 pt-14 font-medium z-20 hidden group-hover:block'>
                            <div className='min-w-40 bg-white rounded flex flex-col gap-1 text-sm'>
                                <p onClick={() => navigate('my-profile')} className='hover:bg-green-100 py-1 px-3'>My Profile</p>
                                <p onClick={() => navigate('my-appointment')} className='hover:bg-green-100 py-1 px-3'>My Appointment</p>
                                <p onClick={logout} className='hover:bg-green-100 py-1 px-3'>Logout</p>
                            </div>
                        </div>
                    </div>
                        : <button onClick={() => navigate('/login')} className='py-1 px-6 bg-green-400 hover:bg-green-500 duration-100 text-white hidden md:block rounded-full'>Login</button>
                }

                <img onClick={() => setShowmenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

                {/* ===== mobile menu ====== */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() =>setShowmenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowmenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                        <NavLink onClick={() => setShowmenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                        <NavLink onClick={() => setShowmenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                        <NavLink onClick={() => setShowmenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar