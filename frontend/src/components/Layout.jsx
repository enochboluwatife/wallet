import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F7] font-sans">
            {/* Main Content Area */}
            <div className="max-w-md mx-auto min-h-screen bg-[#F5F5F7] relative shadow-2xl md:my-8 md:rounded-[3rem] md:overflow-hidden md:h-[900px]">
                {/* 
                   Added md: styles to simulate a phone frame on desktop screens 
                   for better presentation of mobile-first UI 
                */}
                <main className="p-6 pb-32 h-full overflow-y-auto no-scrollbar">
                    <Outlet />
                </main>

                <BottomNav />
            </div>
        </div>
    );
};

export default Layout;
