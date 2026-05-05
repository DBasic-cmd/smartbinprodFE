import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registering Chart.js components is necessary for it to work
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



// The main App component now renders only the chart within a styled container


// Chart Component: Bin Disposal
const BinDisposalChart = ({ propData }) => {

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];




    function formatToDatasets(monthlyData) {
        const residentData = monthlyData.map(entry => entry.residentCount ?? 0);


        return [
            {
                label: 'Residents',
                data: residentData,
                backgroundColor: '#f59e0b',
                borderRadius: 4,
                barPercentage: 0.3,
            },

        ]

    }



    // Demo data for the chart, extracted from the provided image
    const data = {
        labels,
        datasets: formatToDatasets(propData)

    };
    const maxValue = Math.max(
        ...data.datasets[0].data,

    );

    const suggestedMax = Math.ceil(maxValue * 1.1);
    // Chart.js options for styling and configuration
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    boxWidth: 15,
                    padding: 20,
                    font: {
                        size: 14,
                    }
                }
            },
            title: {
                display: false, // The title "Bin Disposal" is handled outside the canvas
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: '#e2e8f0', // slate-200
                },
                ticks: {
                    padding: 10,
                },
                suggestedMax: suggestedMax, // Dynamically set the max value based on the data
                suggestedMin: 0, // Ensure the Y-axis starts at 0
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    padding: 5,
                }
            },
        },
        maintainAspectRatio: false
    };

    // Labels for the X-axis



    // The component renders a container with the chart inside
    return (
        <div className='w-full'>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">Bin Disposal</h2>
                    <button className="flex items-center text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg">
                        This year
                        {/* Heroicon: Chevron Down */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1 text-slate-500">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {/* A container with a fixed height is used to ensure the chart displays correctly */}
                <div className="h-[400px]">
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    )
};
export default BinDisposalChart






