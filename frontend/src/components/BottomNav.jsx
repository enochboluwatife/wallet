import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaCreditCard, FaUser, FaQrcode } from 'react-icons/fa';

const BottomNav = () => {
    // Nav items updated to match screenshot order/icons
    const navItems = [
        { name: 'Home', icon: <FaHome size={24} />, path: '/' },
        { name: 'Statistics', icon: <FaChartBar size={24} />, path: '/statistics' },
        { name: 'Scan', icon: <FaQrcode size={28} />, path: '/scan', isSpecial: true },
        { name: 'Cards', icon: <FaCreditCard size={24} />, path: '/cards' },
        { name: 'Profile', icon: <FaUser size={24} />, path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none">
            {/* 
                Container: Floating rounded white bar. 
                pointer-events-auto needed mainly on the bar to allow clicking through empty space if container is full width 
            */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] px-8 py-4 flex justify-between items-center w-[90%] max-w-md pointer-events-auto relative">

                {navItems.map((item) => {
                    // Special Central Button (Scan)
                    if (item.isSpecial) {
                        return (
                            <div key={item.name} className="relative -top-10">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `
                                        w-16 h-16 rounded-[2rem] flex items-center justify-center transform transition-transform hover:scale-105 shadow-xl
                                        bg-[#FFB039] text-gray-900
                                    `}
                                >
                                    {/* Scan Icon Outline Style */}
                                    <FaQrcode size={28} />
                                </NavLink>
                            </div>
                        );
                    }

                    // Standard Nav Items
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `transition-colors duration-200 ${isActive ? 'text-[#434DDB]' : 'text-gray-300'
                                }`
                            }
                        >
                            {item.icon}
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
