import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import Sidebar from './Sidebar';

const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <div className="relative h-[70px] bg-slate-400 grid grid-cols-10 items-center px-3">
            {/* Menu Icon for Toggling Sidebar */}
            <div className='md:col-span-2'>
                <button onClick={toggleSidebar} className='text-black flex items-center md:hidden'>
                    <BiMenu className='text-2xl' />
                </button>
            </div>

            {/* Title */}
            <div className='col-span-7 md:col-span-7'>
                <h2 className='font-extrabold text-xl'>DASHBOARD</h2>
            </div>

            {/* User Icon */}
            <div>
                <div className='h-10 w-10 rounded-full shadow-xl bg-white flex items-center justify-center uppercase font-bold'>
                    <p>hd</p>
                </div>
            </div>

            {/* Floating Sidebar */}
            {showSidebar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex" onClick={toggleSidebar}>
                    <div
                        className="w-64 bg-slate-400 h-full shadow-lg p-4 transform transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Sidebar />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
