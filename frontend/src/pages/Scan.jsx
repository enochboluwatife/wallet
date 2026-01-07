import React, { useState } from 'react';
import { FaQrcode, FaCamera, FaArrowLeft } from 'react-icons/fa';

const Scan = () => {
    const [activeTab, setActiveTab] = useState('scan'); // 'scan' or 'receive'

    return (
        <div className="space-y-6">
            <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">QR Payment</h2>
            </div>

            {/* Tabs */}
            <div className="bg-white p-1 rounded-2xl flex shadow-sm mb-6">
                <button
                    onClick={() => setActiveTab('scan')}
                    className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'scan' ? 'bg-[#FFB039] text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    Scan Code
                </button>
                <button
                    onClick={() => setActiveTab('receive')}
                    className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'receive' ? 'bg-[#434DDB] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    My Code
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                {activeTab === 'scan' ? (
                    <div className="text-center w-full max-w-sm">
                        <div className="bg-black rounded-3xl h-80 w-full mb-6 relative overflow-hidden flex items-center justify-center">
                            {/* Camera UI Mock */}
                            <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center" />
                            <div className="relative z-10 w-48 h-48 border-2 border-[#FFB039] rounded-3xl flex items-center justify-center">
                                <div className="w-44 h-0.5 bg-red-500 animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
                            </div>
                            <div className="absolute bottom-4 text-white text-xs opacity-80">
                                Point camera at QR Code
                            </div>
                        </div>
                        <button className="bg-gray-900 text-white w-full py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2">
                            <FaCamera />
                            Access Camera
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-xs text-center border-t-4 border-[#434DDB]">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-500">
                            JD
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">John Doe</h3>
                        <p className="text-gray-400 text-sm mb-8">@johndoe • Teggare Wallet</p>

                        <div className="bg-gray-100 p-4 rounded-2xl mb-6">
                            <FaQrcode className="w-full h-48 text-gray-800" />
                        </div>

                        <p className="text-xs text-gray-400">Scan this code to pay me</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scan;
