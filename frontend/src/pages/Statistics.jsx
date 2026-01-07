import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import api from '../api';
import { useState, useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Statistics = () => {
    // Mock Data
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: 'Income vs Expense',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const [stats, setStats] = useState(null);
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const analyticsRes = await api.get('wallet/analytics/');
                setStats(analyticsRes.data);

                const walletRes = await api.get('wallet/');
                if (walletRes.data.length > 0) {
                    setWallet(walletRes.data[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: stats ? stats.chart_data.income : [],
                backgroundColor: '#434DDB',
                borderRadius: 4,
            },
            {
                label: 'Expenses',
                data: stats ? stats.chart_data.expenses : [],
                backgroundColor: '#FFB039',
                borderRadius: 4,
            },
        ],
    };

    return (
        <div className="space-y-6">
            {/* Header / total Balance */}
            <div>
                <div className="flex items-center gap-4 mb-4">
                    {/* <FaChevronLeft /> Back button if needed */}
                    <h2 className="text-2xl font-bold text-center flex-1 md:text-left md:flex-none">Statistics</h2>
                </div>

                <div className="mt-6">
                    <p className="text-gray-400 text-sm mb-1">Total Balance</p>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        ${wallet ? Number(wallet.balance).toLocaleString() : '808,788,000.00'}
                    </h1>
                </div>
            </div>

            {/* Overview & Chart */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700 text-lg">Overview</h3>
                    <select className="bg-white border md:border-none text-sm p-2 px-4 rounded-lg shadow-sm text-gray-500 outline-none">
                        <option>Month</option>
                    </select>
                </div>
                <div className="bg-white p-4 rounded-3xl shadow-sm h-64 flex items-end pb-2">
                    <Bar options={options} data={data} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#434DDB] p-5 rounded-3xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-3">
                            <FaArrowUp />
                        </div>
                        <p className="text-blue-100 text-sm">Income</p>
                        <p className="text-xl font-bold">${stats ? stats.total_income.toLocaleString() : '0.00'}</p>
                    </div>
                    {/* Decor */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                </div>
                <div className="bg-[#FFB039] p-5 rounded-3xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-3">
                            <FaArrowDown />
                        </div>
                        <p className="text-yellow-100 text-sm">Expenses</p>
                        <p className="text-xl font-bold">${stats ? stats.total_expenses.toLocaleString() : '0.00'}</p>
                    </div>
                    {/* Decor */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
