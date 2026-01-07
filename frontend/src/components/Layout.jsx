import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F7]">
            <Sidebar />
            <div className="md:ml-64 min-h-screen pb-20 md:pb-0">
                <main className="p-4 md:p-8 max-w-5xl mx-auto">
                    <Outlet />
                </main>
            </div>
            <BottomNav />
        </div>
    );
};

export default Layout;
