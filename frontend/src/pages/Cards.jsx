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
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">My Card</h2>
            </div>
            <p className="text-gray-400 text-sm">Tap Card for more detailed information</p>

            <div className="space-y-6">
                {cards.map(card => (
                    <div key={card.id}>
                        <WalletCard
                            cardNumber={card.card_number} // Using backend field names
                            cardHolder={card.card_holder}
                        />
                    </div>
                ))}
                {cards.length === 0 && <p>No cards linked.</p>}
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="font-semibold text-gray-800">Receive your card?</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Tap the button to make sure your card is fully activated</p>
                </div>
                <button className="bg-brand-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg shadow-brand-primary/30">
                    Activate
                </button>
            </div>
        </div>
    );
};

export default Cards;
