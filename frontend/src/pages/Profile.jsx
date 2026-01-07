import React from 'react';
import QRCode from 'react-qr-code';
import { FaUser } from 'react-icons/fa';

const Profile = () => {
    // Hardcoded for design match as per screenshot
    const user = {
        name: "Call Me Teggar",
        uid: "8194638720",
        amount: "999.99"
    };

    return (
        <div className="flex flex-col items-center pt-8 pb-24 px-6 md:px-0 max-w-sm mx-auto">
            {/* QR Code Section */}
            <div className="relative bg-white p-2 rounded-xl">
                <QRCode
                    value={`https://teggare.com/pay/${user.uid}`}
                    size={200}
                    fgColor="#434DDB"
                    bgColor="transparent"
                />
                {/* Avatar Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-200 border-4 border-white overflow-hidden shadow-sm flex items-center justify-center">
                    {/* Placeholder for user image if no URL */}
                    <span className="font-bold text-gray-500 text-xs text-center leading-tight">YOU</span>
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-gray-500 mb-1">Send to:</p>
                <h2 className="text-2xl font-medium text-gray-800 tracking-wide">{user.name}</h2>
                <p className="text-gray-400 mt-1 font-mono">UID: {user.uid}</p>
            </div>

            <div className="mt-8">
                <h1 className="text-5xl font-medium text-gray-800">${user.amount}</h1>
            </div>

            {/* Bank Account Card */}
            <div className="w-full bg-white mt-10 p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden p-1">
                    <img src="/zenith-logo.png" alt="Zenith Bank" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Zenith Bank Account ****703804</p>
                </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-6 px-4">
                Amet minim mollit non deserunt ullamco est sit aliqua
            </p>

            <button className="w-full bg-brand-primary text-white font-medium py-3 rounded-xl mt-8 shadow-lg shadow-brand-primary/30 active:scale-95 transition-transform">
                Show QR code
            </button>
        </div>
    );
};

export default Profile;
