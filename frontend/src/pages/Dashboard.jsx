import React, { useState, useEffect } from 'react';
import WalletCard from '../components/WalletCard';
import { FaPlus, FaExchangeAlt, FaChartPie, FaCar, FaHome, FaEye, FaEyeSlash, FaBell } from 'react-icons/fa';
import api from '../api';

const Dashboard = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [walletData, setWalletData] = useState(null);
    const [activities, setActivities] = useState([]);

    // Mock Data for Savings
    const savings = [
        { id: 1, name: 'New car', target: 20000, current: 5000, icon: <FaCar />, color: 'green' },
        { id: 2, name: 'New House', target: 500000, current: 20000, icon: <FaHome />, color: 'brand' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const walletRes = await api.get('wallet/');
                if (walletRes.data.length > 0) {
                    setWalletData(walletRes.data[0]);
                }

                const activityRes = await api.get('transactions/');
                setActivities(activityRes.data);
            } catch (error) {
                console.error("Error connecting to backend", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <header className="flex justify-between items-start pt-2">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <span className="text-sm font-medium">Total Balance</span>
                        <button onClick={() => setShowBalance(!showBalance)} className="hover:text-brand-primary">
                            {showBalance ? <FaEye size={14} /> : <FaEyeSlash size={14} />}
                        </button>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {showBalance ? `${walletData?.currency || '$'}${Number(walletData?.balance || 0).toLocaleString()}` : '••••••••'}
                    </h1>
                </div>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaBell size={24} />
                    {/* Notification Dot */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#F5F5F7]"></span>
                </button>
            </header>

            {/* Wallet Card */}
            <section>
                <WalletCard
                    cardNumber="XXXX XXXX XXXX XXXX"
                    cardHolder="John Doe"
                    variant="blue"
                />
            </section>

            {/* Action Buttons */}
            <section className="grid grid-cols-3 gap-4">
                <ActionButton icon={<FaPlus />} label="Add money" />
                <ActionButton icon={<FaExchangeAlt />} label="Transfer" />
                <ActionButton icon={<FaChartPie />} label="Budget" />
            </section>

            {/* Recent Activities */}
            <section>
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Recent activities</h3>
                    <button className="text-xs text-brand-primary font-medium hover:underline">View All</button>
                </div>

                <div className="space-y-4">
                    {activities.length > 0 ? activities.slice(0, 3).map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm flex justify-between items-center group hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                {/* Icon Box */}
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm
                                    ${getServiceColor(item.description)}
                                `}>
                                    {getServiceIcon(item.description)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm mb-0.5">{item.description}</p>
                                    <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Payment Received</p>
                                </div>
                            </div>
                            <span className={`font-bold text-sm ${item.transaction_type === 'DEBIT' ? 'text-[#EB001B]' : 'text-green-500'}`}>
                                {item.transaction_type === 'DEBIT' ? '-' : '+'}USD {item.amount}
                            </span>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-gray-400 text-sm">No recent transactions</div>
                    )}
                </div>
            </section>

            {/* Savings Plans */}
            <section>
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-lg font-bold text-gray-800">My savings plans</h3>
                    <button className="text-xs text-brand-primary font-medium hover:underline">View All</button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                    {savings.map(plan => (
                        <div key={plan.id} className="min-w-[150px] bg-white p-4 rounded-3xl shadow-sm h-44 flex flex-col justify-between snap-start">
                            <div className="flex justify-between items-start">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
                                    ${plan.color === 'green' ? 'bg-green-100 text-green-600' : 'bg-[#EBF1FF] text-[#434DDB]'}
                                `}>
                                    {plan.icon}
                                </div>
                                <span className="text-gray-300 font-bold text-xs">{'>'}</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-sm mb-1">{plan.name}</p>
                                <p className="text-xs text-gray-400 font-medium">${plan.current.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}

                    {/* Add New Button */}
                    <div className="min-w-[80px] flex items-center justify-center snap-start">
                        <button className="w-12 h-12 bg-[#FFB039] rounded-full flex items-center justify-center text-gray-900 shadow-lg shadow-orange-200 hover:scale-110 transition-transform">
                            <FaPlus />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper for Action Buttons
const ActionButton = ({ icon, label }) => (
    <button className="bg-[#5B86E5] text-white py-3 px-2 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:bg-[#4a75d4] transition-colors">
        <span className="text-sm">{icon}</span>
        <span className="font-medium text-xs tracking-wide">{label}</span>
    </button>
);

// Helpers for Service Icons/Colors (Mock logic based on screenshot)
const getServiceIcon = (desc) => {
    const d = desc?.toLowerCase() || '';
    if (d.includes('netflix')) return <span className="font-serif text-red-600 font-bold">N</span>;
    if (d.includes('amazon')) return <span className="font-bold text-gray-800">a</span>;
    if (d.includes('canva')) return <span className="font-cursive text-white text-xs">Ca</span>;
    return <span className="text-gray-500">?</span>;
};

const getServiceColor = (desc) => {
    const d = desc?.toLowerCase() || '';
    if (d.includes('netflix')) return 'bg-black';
    if (d.includes('amazon')) return 'bg-white border border-gray-100';
    if (d.includes('canva')) return 'bg-black';
    return 'bg-gray-100';
};

export default Dashboard;
