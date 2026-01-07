import React, { useState, useEffect } from 'react';
import WalletCard from '../components/WalletCard';
import { FaPlus } from 'react-icons/fa';
import api from '../api';

const Cards = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.get('cards/')
            .then(res => setCards(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">My Card</h2>
                <button className="w-8 h-8 bg-[#436CCC] rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-600 transition-colors">
                    <FaPlus size={14} />
                </button>
            </div>
            <p className="text-gray-500 text-sm mb-6 font-medium">Tap Card for more detailed information</p>

            {/* Cards List */}
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 pb-4 no-scrollbar">
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <div key={card.id}>
                            <WalletCard
                                cardNumber={card.card_number}
                                cardHolder={card.card_holder}
                                variant={index % 2 === 0 ? 'blue' : 'gold'} // Alternating variants
                            />
                        </div>
                    ))
                ) : (
                    // Show placeholders if no cards exist (for design verification) 
                    <>
                        <WalletCard
                            cardNumber="XXXX XXXX XXXX XXXX"
                            cardHolder="John Doe"
                            variant="blue"
                        />
                        <WalletCard
                            cardNumber="XXXX XXXX XXXX XXXX"
                            cardHolder="British IKEA"
                            variant="gold"
                        />
                    </>
                )}
            </div>

            {/* Footer / Receive Card Section */}
            <div className="mt-auto pt-4">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="font-bold text-gray-800 text-base">Receive your card?</p>
                        <p className="text-xs text-gray-400 mt-1 max-w-[180px] leading-tight">
                            Tap the button to make sure your card is fully activated
                        </p>
                    </div>
                    <button className="bg-[#5B86E5] text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-[#4a75d4] transition-all">
                        Activate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cards;
