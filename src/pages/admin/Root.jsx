import React from 'react';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return ( 
        <div className='h-screen w-full flex flex-col'>
            {/* Header */}
            <div className='flex-none'>
                <Header />
            </div>
            
            {/* Main Content */}
            <div className='flex flex-1 overflow-hidden'>
                <aside className='bg-slate-400 hidden md:flex w-1/4 h-full shadow-md'>
                    <Sidebar />
                </aside>
                
                <main className='bg-white w-full h-full overflow-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Root;
