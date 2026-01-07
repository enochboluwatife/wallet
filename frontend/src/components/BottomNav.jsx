import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaCreditCard, FaUser, FaQrcode } from 'react-icons/fa';

const BottomNav = () => {
    const navItems = [
        { name: 'Home', icon: <FaHome size={20} />, path: '/' },
        { name: 'Stats', icon: <FaChartBar size={20} />, path: '/statistics' },
        // Center spacing for the floating button
        { name: 'Scan', icon: <FaQrcode size={24} />, path: '/profile', isSpecial: true },
        { name: 'Cards', icon: <FaCreditCard size={20} />, path: '/cards' },
        { name: 'Profile', icon: <FaUser size={20} />, path: '/profile' },
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
            <div className="bg-white rounded-[2rem] shadow-2xl px-6 py-4 flex justify-between items-center relative">
                {navItems.map((item, index) => {
                    if (item.isSpecial) {
                        return (
                            <div key={item.name} className="absolute left-1/2 -translate-x-1/2 -top-6">
                                <NavLink to={item.path} className="w-16 h-16 bg-[#FFB039] rounded-full flex items-center justify-center text-gray-900 shadow-lg shadow-orange-200 border-4 border-[#F5F5F7]">
                                    <span className="text-2xl">{item.icon}</span>
                                </NavLink>
                            </div>
                        )
                    }

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#434DDB]' : 'text-gray-800'
                                }`
                            }
                        >
                            <div className="relative py-2 px-2">
                                {item.icon}
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#434DDB] rounded-t-full transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`
                                    }
                                />
                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
