import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaCreditCard, FaUser } from 'react-icons/fa';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: <FaHome />, path: '/' },
        { name: 'Statistics', icon: <FaChartBar />, path: '/statistics' },
        { name: 'Cards', icon: <FaCreditCard />, path: '/cards' },
        { name: 'Profile', icon: <FaUser />, path: '/profile' },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0">
            <nav className="flex-1 px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
