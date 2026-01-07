import React, { useState, useEffect } from 'react';
import WalletCard from '../components/WalletCard';
import { FaPlus, FaExchangeAlt, FaChartPie, FaCar, FaHome, FaEye, FaEyeSlash, FaBell } from 'react-icons/fa';
import api from '../api';

const Dashboard = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [walletData, setWalletData] = useState(null);
    const [activities, setActivities] = useState([]);

    // Mock Data
    const savings = [
        { id: 1, name: 'New car', target: 20000, current: 5000, icon: <FaCar /> },
        { id: 2, name: 'New House', target: 500000, current: 20000, icon: <FaHome /> },
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
        <div className="space-y-6 max-w-md mx-auto md:max-w-full">
            {/* Top Header Section */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Balance</p>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            {showBalance ? `${walletData?.currency || ''} ${Number(walletData?.balance || 0).toLocaleString()} ` : '••••••••'}
                        </h1>
                        <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-brand-primary">
                            {showBalance ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                        </button>
                    </div>
                </div>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
                    <FaBell size={24} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>

            {/* Blue Card Section */}
            <section>
                <WalletCard
                    cardNumber="XXXX XXXX XXXX XXXX"
                    cardHolder="John Doe"
                />
            </section>

            {/* Action Buttons */}
            <section className="flex justify-between gap-3">
                <ActionButton icon={<FaPlus />} label="Add money" active={true} />
                <ActionButton icon={<FaExchangeAlt />} label="Transfer" />
                <ActionButton icon={<FaChartPie />} label="Budget" />
            </section>

            {/* Recent Activities */}
            <section className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700 text-lg">Recent activities</h3>
                    <button className="text-sm text-gray-500 hover:text-brand-primary">View All</button>
                </div>
                <div className="space-y-3">
                    {activities.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                            <div className="flex items-center gap-4">
                                <div className={`w - 12 h - 12 rounded - xl flex items - center justify - center font - bold text - xl shadow - sm ${item.transaction_type === 'DEBIT' ? 'bg-black text-red-600' : 'bg-green-100 text-green-600'} `}>
                                    {item.description ? item.description.charAt(0) : '?'}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{item.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.category}</p>
                                </div>
                            </div>
                            <span className={`font - bold text - sm ${item.transaction_type === 'DEBIT' ? 'text-red-500' : 'text-green-500'} `}>
                                {item.transaction_type === 'DEBIT' ? '-' : '+'} {walletData.currency} {item.amount}
                            </span>
                        </div>
                    ))}
                    {activities.length === 0 && <p className="text-gray-400 text-center py-4">No recent activities</p>}
                </div>
            </section>

            {/* Savings Plans */}
            <section className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700 text-lg">My savings plans</h3>
                    <button className="text-sm text-gray-500 hover:text-brand-primary">View All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {savings.map(plan => (
                        <div key={plan.id} className="min-w-[160px] bg-gray-100/80 p-5 rounded-3xl flex flex-col justify-between h-40">
                            <div className="flex justify-between items-start">
                                <div className={`p - 3 rounded - xl text - xl ${plan.name.includes('car') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-brand-primary'} `}>
                                    {plan.icon}
                                </div>
                                <span className="text-gray-400 font-bold">{'>'}</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 mb-1">{plan.name}</p>
                                <p className="text-sm text-gray-500">${plan.current.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                    {/* Add new saving card */}
                    <div className="min-w-[100px] flex items-center justify-center">
                        <button className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-brand-primary hover:scale-110 transition-all">
                            <FaPlus />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ActionButton = ({ icon, label, active }) => (
    <button className={`flex - 1 py - 3 px - 2 rounded - xl flex items - center justify - center gap - 2 transition - all shadow - sm
        ${active
            ? 'bg-brand-primary text-white shadow-brand-primary/30'
            : 'bg-[#5B86E5] text-white' // Using the specific blue from buttons in screenshot
        } `}>
        {icon}
        <span className="font-medium text-xs whitespace-nowrap">{label}</span>
    </button>
);

export default Dashboard;
