import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiBook, FiClipboard, FiGrid } from 'react-icons/fi';

const Sidebar = () => {
    const links = [
        { title: "Dashboard", to: "/dashboard", icon: <FiGrid /> },
        { title: "Admins", to: "/dashboard/admins", icon: <FiUsers /> },
        { title: "Lecturers", to: "/dashboard/lecturers", icon: <FiBook /> },
        { title: "Appraisals", to: "/dashboard/appraisals", icon: <FiClipboard /> },
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-400 p-4 text-white">
            <div>
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.to}
                        className="flex items-center space-x-4 p-3 rounded-lg mb-3
                               hover:bg-slate-500 hover:text-white transition-all
                               duration-200 ease-in-out transform hover:scale-105"
                    >
                        <span className="text-2xl">{link.icon}</span>
                        <span className="font-medium">{link.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
