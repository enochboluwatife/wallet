import React from 'react';

const WalletCard = ({ cardNumber, cardHolder }) => {
    return (
        <div className="w-full h-48 bg-gradient-to-br from-[#5B86E5] to-[#36D1DC] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-4 right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute top-10 right-4 w-10 h-10 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-[-10px] left-[-10px] w-20 h-20 bg-blue-500/30 rounded-full blur-xl"></div>

            <div className="h-full flex flex-col justify-end relative z-10">
                <p className="text-xl tracking-widest font-mono mb-6 shadow-black/5 drop-shadow-md">{cardNumber}</p>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-blue-50 mb-1">John Doe</p>
                        {/* Mocking the two bars */}
                        <div className="flex gap-1 mt-2">
                            <div className="w-8 h-2 bg-gray-300/50 rounded-sm"></div>
                            <div className="w-5 h-2 bg-gray-300/50 rounded-sm"></div>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-[#EB001B] opacity-90 z-10"></div>
                        <div className="w-8 h-8 rounded-full bg-[#F79E1B] -ml-3 opacity-90 z-20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletCard;
