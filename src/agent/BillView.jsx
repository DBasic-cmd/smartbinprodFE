import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/AgentSidebar';
import Topbar from '../components/Topbar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Raw SVG for Download Icon from Heroicons (Outline style)
const DownloadIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
    </svg>
);

// Raw SVG for Check Circle Icon from Heroicons (Solid style)
const CheckCircleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 mr-2" style={{ color: '#22C55E' /* green-500 */ }}
    >
        <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
        />
    </svg>
);


const BillView = () => {
    const [billData, setBillData] = useState(null);
    const [showDownloadConfirmModal, setShowDownloadConfirmModal] = useState(false);
    const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false);
    const billContentRef = useRef(null);

    // Mock API call function
    const fetchBillData = async (devMode = true) => {
        if (devMode) {
            // Local dummy data for development
            return {
                name: "Adebimpe Soriyan",
                payerId: "N190465908",
                billRef: "181876738FC",
                paymentDue: "December 22, 2022",
                issuedOn: "December 7, 2022",
                items: [{ description: "Waste Bin Disposal", amount: "₦20,000" }]
            };
        } else {
            // Simulate a real API call (e.g., using fetch or axios)
            // In a real application, you would replace this with your actual API endpoint
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        name: "Adebimpe Soriyan",
                        payerId: "N190465908",
                        billRef: "181876738FC",
                        paymentDue: "December 22, 2022",
                        issuedOn: "December 7, 2022",
                        items: [{ description: "Waste Bin Disposal", amount: "₦20,000" }]
                    });
                }, 1000); // Simulate network delay
            });
        }
    };

    useEffect(() => {
        const getBill = async () => {
            const data = await fetchBillData(true); // Set to true for devMode, false for production API
            setBillData(data);
        };
        getBill();
    }, []);

    const handleDownloadBill = async () => {
        setShowDownloadConfirmModal(true);
    };

    const confirmDownload = async () => {
        setShowDownloadConfirmModal(false);
        if (billContentRef.current) {
            const canvas = await html2canvas(billContentRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Bill_${billData.billRef}.pdf`);
            setShowDownloadSuccessModal(true);
            setTimeout(() => setShowDownloadSuccessModal(false), 3000); // Hide success modal after 3 seconds
        }
    };

    const handlePayBill = () => {
        alert("Coming soon");
    };

    if (!billData) {
        return <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F3F4F6' /* gray-100 */, color: '#4B5563' /* gray-700 */ }}>Loading bill data...</div>;
    }

    return (


        <div className="flex sans h-screen max-w-screen">
            <Sidebar addkey="1" />
            <div className=" bg-zinc-100 min-h-screen   flex flex-col flex-1 overflow-y-auto  ">
                <Topbar />
                <div>
                    <div>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 " style={{ borderColor: '#E5E7EB' /* gray-200 */ }}>
                            <button
                                onClick={handleDownloadBill}
                                className="flex items-center  justify-between px-6 py-3  border  text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
                                style={{ color: '#008236' /* green-700 */, borderColor: '008236', /* focus ring */ '--tw-ring-color': '#3B82F6', '--tw-ring-offset-color': '#FFFFFF' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none" className='mx-2'>
                                    <path d="M7.125 9.20801V13.958L8.70833 12.3747" stroke="#007836" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.12435 13.9583L5.54102 12.375" stroke="#007836" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.4173 8.41634V12.3747C17.4173 16.333 15.834 17.9163 11.8756 17.9163H7.12565C3.16732 17.9163 1.58398 16.333 1.58398 12.3747V7.62467C1.58398 3.66634 3.16732 2.08301 7.12565 2.08301H11.084" stroke="#007836" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.4173 8.41634H14.2507C11.8757 8.41634 11.084 7.62467 11.084 5.24967V2.08301L17.4173 8.41634Z" stroke="#007836" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Download as PDF
                            </button>
                            <button
                                onClick={handlePayBill}
                                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
                                style={{ borderColor: 'transparent', color: '#FFFFFF', /* hover bg */ '--tw-bg-opacity': 1, 'backgroundColor': 'rgb(0 128 0 / var(--tw-bg-opacity))', /* focus ring */ '--tw-ring-color': '#22C55E', '--tw-ring-offset-color': '#FFFFFF' }}
                            >
                                Proceed to payment

                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center p-4 min-h-screen" style={{ backgroundColor: '#F3F4F6' /* gray-100 */ }}>

                        {/* Action Buttons */}

                        <div className="shadow-lg rounded-lg max-w-4xl w-full p-6 sm:p-8" style={{ backgroundColor: '#FFFFFF' /* white */ }}>
                            {/* Bill Content - This is what will be converted to PDF */}
                            <div ref={billContentRef} className="p-4 sm:p-6" style={{ backgroundColor: '#FFFFFF' /* white */ }}>
                                {/* Header Section */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center  my-12">
                                    <div className="flex items-center mb-4 sm:mb-0">
                                        {/* This is a placeholder for your logo or emblem */}

                                        <div className='flex flex-col items-center justify-center'>
                                            <img src="/images/sealLogo.svg" alt="Lagos Seal" className="h-16 mb-1 p-2" />
                                            <h1 className="text-sm sm:text-base font-semibold" style={{ color: '#1F2937' /* gray-800 */ }}>
                                                UTILITIES SERVICE PROVIDER INITIATIVE
                                            </h1>
                                            <p className="text-xs sm:text-sm" style={{ color: '#4B5563' /* gray-600 */ }}>BY THE LAGOS STATE GOVERNMENT</p>
                                        </div>
                                    </div>
                                    <div className="sm:text-right">
                                        <h2 className="text-sm sm:text-base " style={{ color: '#4a5565' /* gray-800 */ }}>
                                            UTILITIES SERVICE PROVIDER INITIATIVE

                                        </h2>
                                        <h2 className="text-sm sm:text-base " style={{ color: '#1F2937' /* gray-800 */ }}>

                                            BY THE LAGOS STATE GOVERNMENT
                                        </h2>

                                        <p className="text-xs sm:text-sm" style={{ color: '#6B7280' /* gray-500 */ }}>Address: Lagos House, marina Lagos State</p>
                                    </div>
                                </div>

                                <hr className="my-6 border-blue " style={{ borderColor: '#4988D3' /* blue-200 */ }} />

                                {/* Billed To and Bill Details Section */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-0 sm:gap-x-8 mb-8">
                                    <div>
                                        <p className="text-xs sm:text-sm  font-thin mb-4" style={{ color: '#6B7280' /* gray-500 */ }}>BILLED TO</p>
                                        <h3 className="text-2xl font-light " style={{ color: '#111827' /* gray-900 */ }}>{billData.name}</h3>
                                        <p className="text-sm font-thin" style={{ color: '#828282' /* gray-600 */ }}>Payer ID: {billData.payerId}</p>
                                    </div>
                                    <div className="sm:text-right">
                                        <p className="text-2xl font-bold mb-1" style={{ color: '#4988D3' /* gray-500 */ }}>BILL REF: <span className="font-bold" style={{ color: '#4988D3' /* gray-900 */ }}>{billData.billRef}</span></p>
                                        <div className='flex flex-row justify-end '>
                                            <div className="flex flex-col justify-between sm:justify-end items-end  mt-2 px-4" style={{ color: '#60737D' /* gray-700 */ }}>
                                                <span className="font-thin ">Issued on</span>
                                                <span>{billData.issuedOn}</span>
                                            </div>
                                            <div className="flex flex-col justify-between sm:justify-end items-end mt-1" style={{ color: '#60737D' /* gray-700 */ }}>
                                                <span className="font-thin ">Payment Due</span>
                                                <span>{billData.paymentDue}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div className="overflow-x-auto mt-28">
                                    <table className="min-w-full rounded-lg" style={{ backgroundColor: '#FFFFFF' /* white */, }}>
                                        <thead>
                                            <tr className="text-left text-xl font-thin" style={{ backgroundColor: '#F9FAFB' /* gray-50 */, color: '#4B5563' /* gray-600 */ }}>
                                                <th className="py-3 px-6 border-b font-thin" style={{ borderColor: '#E5E7EB' /* gray-200 */ }}>S/N</th>
                                                <th className="py-3 px-6 border-b font-thin" style={{ borderColor: '#E5E7EB' /* gray-200 */ }}>DESCRIPTION</th>
                                                <th className="py-3 px-6 border-b text-right font-thin" style={{ borderColor: '#E5E7EB' /* gray-200 */ }}>AMOUNT</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm font-light" style={{ color: '#1F2937', backgroundColor: '#F9FAFB'/* gray-800 */ }}>
                                            {billData.items.map((item, index) => (
                                                <tr key={index} className="h-28" style={{ borderColor: '#E5E7EB' /* gray-200 */ }}>
                                                    <td className="py-3 px-6 whitespace-nowrap text-xl">{index + 1}</td>
                                                    <td className="py-3 px-6 text-lg">{item.description}</td>
                                                    <td className="py-3 px-6 text-right font-thin text-xl">{item.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Thank You and USP Initiative */}
                                <div className=" mt-8">
                                    <p className=" font-thin text-2xl" style={{ color: '#1F2937' /* gray-800 */ }}>Thank you!</p>
                                </div>
                            </div>


                        </div>

                        {/* Download Confirmation Modal */}
                        {showDownloadConfirmModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(75, 85, 99, 0.75)' /* gray-600 with 75% opacity */ }}>
                                <div className="rounded-lg p-6 max-w-sm w-full shadow-xl" style={{ backgroundColor: '#FFFFFF' /* white */ }}>
                                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' /* gray-900 */ }}>Confirm Download</h3>
                                    <p className="text-sm mb-6" style={{ color: '#374151' /* gray-700 */ }}>
                                        Are you sure you want to download this bill as a PDF?
                                    </p>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => setShowDownloadConfirmModal(false)}
                                            className="px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                                            style={{ color: '#374151' /* gray-700 */,   /* hover bg */ '--tw-bg-opacity': 1, 'backgroundColor': 'rgb(249 250 251 / var(--tw-bg-opacity))', /* focus ring */ '--tw-ring-color': '#6366F1', '--tw-ring-offset-color': '#FFFFFF' }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmDownload}
                                            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                                            style={{ borderColor: 'transparent', color: '#FFFFFF', /* hover bg */ '--tw-bg-opacity': 1, 'backgroundColor': 'rgb(37 99 235 / var(--tw-bg-opacity))', /* focus ring */ '--tw-ring-color': '#3B82F6', '--tw-ring-offset-color': '#FFFFFF' }}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Download Success Modal */}
                        {showDownloadSuccessModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(75, 85, 99, 0.75)' /* gray-600 with 75% opacity */ }}>
                                <div className="rounded-lg p-6 max-w-xs w-full shadow-xl flex flex-col items-center" style={{ backgroundColor: '#FFFFFF' /* white */ }}>
                                    <CheckCircleIcon />
                                    <h3 className="text-lg font-semibold mt-3" style={{ color: '#111827' /* gray-900 */ }}>Download Successful!</h3>
                                    <p className="text-sm mt-2" style={{ color: '#374151' /* gray-700 */ }}>Your bill has been downloaded.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default BillView;