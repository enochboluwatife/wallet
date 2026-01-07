import React from 'react';

const WalletCard = ({ cardNumber, cardHolder, variant = 'blue' }) => {
    const isBlue = variant === 'blue';

    // Gradients based on the image (Approximation)
    // Blue: Lightish blue gradient
    // Gold: Light gold/orange gradient
    const bgClass = isBlue
        ? "bg-gradient-to-br from-[#6A9EFF] to-[#AEC9FF]" // Tweaked for lighter blue look
        : "bg-gradient-to-br from-[#F5C86B] to-[#FDE5B3]"; // Tweaked for gold look

    // Decorations specific to the variants (Bubbles/Blobs)
    const renderDecorations = () => {
        if (isBlue) {
            return (
                <>
                    {/* Top Center-Right Blue Blob */}
                    <div className="absolute top-[-20px] left-[40%] w-32 h-32 bg-[#436CCC]/20 rounded-full blur-2xl"></div>
                    {/* Top Right White Circle */}
                    <div className="absolute top-6 right-8 w-12 h-12 bg-white/80 rounded-full blur-[1px]"></div>
                    {/* Bottom Left Blue Small Blob */}
                    <div className="absolute bottom-10 left-6 w-16 h-16 bg-[#436CCC]/10 rounded-full blur-xl"></div>
                    {/* Blue Small Dot */}
                    <div className="absolute top-[50%] right-[10%] w-6 h-6 bg-[#436CCC]/30 rounded-full blur-sm"></div>
                </>
            );
        } else {
            return (
                <>
                    {/* Top Center Gold Blob */}
                    <div className="absolute top-[-10px] left-[35%] w-24 h-24 bg-[#D99A26]/20 rounded-full blur-xl"></div>
                    {/* Top Right White Circle */}
                    <div className="absolute top-8 right-10 w-12 h-12 bg-white/80 rounded-full blur-[1px]"></div>
                    {/* Bottom Right Gold Small Blob */}
                    <div className="absolute bottom-[30%] right-[5%] w-8 h-8 bg-[#D99A26]/20 rounded-full blur-md"></div>
                    {/* Left center faint blob */}
                    <div className="absolute top-[40%] left-[10%] w-16 h-16 bg-[#D99A26]/10 rounded-full blur-xl"></div>
                </>
            );
        }
    };

    return (
        <div className={`w-full h-52 ${bgClass} rounded-3xl p-6 text-gray-800 shadow-lg relative overflow-hidden transition-transform transform hover:scale-[1.02] duration-300`}>
            {/* Decorative Elements */}
            {renderDecorations()}

            <div className="h-full flex flex-col justify-center relative z-10 pl-2">
                {/* Card Number */}
                <p className="text-2xl tracking-[0.15em] font-sans font-medium mb-8 text-gray-700/90">
                    {cardNumber || "XXXX XXXX XXXX XXXX"}
                </p>

                <div className="flex justify-between items-end mt-auto">
                    <div>
                        <p className="text-sm text-gray-700 font-medium mb-3">{cardHolder || "Card Holder"}</p>
                        {/* Bars / Chip Mockup */}
                        <div className="flex gap-1">
                            <div className="w-10 h-2 bg-gray-500/30 rounded-full"></div>
                            <div className="w-6 h-2 bg-gray-500/30 rounded-full"></div>
                        </div>
                    </div>

                    {/* Mastercard Logo */}
                    <div className="flex items-center">
                        <div className="relative flex">
                            <div className="w-10 h-10 rounded-full bg-[#EB001B] opacity-90 z-10"></div>
                            <div className="w-10 h-10 rounded-full bg-[#F79E1B] -ml-4 opacity-90 z-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletCard;
