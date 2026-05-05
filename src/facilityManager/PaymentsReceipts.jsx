import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import PaymentNav from '../components/PaymentNav';
import useFacilityMgrStore from '../store/useFacilityMgrStore';
import api from '../api/axiosConfig';

const PaymentReceipts = () => {
    // --- State ---
    const [receipts, setReceipts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('dsc');
    const [currentPage, setCurrentPage] = useState(1);
    const [notification, setNotification] = useState(null);
    const [totalPages, setTotalPages] = useState('');
    const itemsPerPage = 6;

    const navigate = useNavigate()


    const fetchData = async () => {
        try {
            const { data } = await api.get(`/Wallet/my-transaction-history?AccountNo=${useFacilityMgrStore.getState().facilityMgrInfo.accountNo}&PageNo=${currentPage}&PageSize=${itemsPerPage}`);
            if (data.succeeded) {
                const newData = data.data.data.map((item, index) => ({
                    sn: index + 1 + (currentPage - 1) * itemsPerPage,
                    id: item.id,
                    transactionRef: item.transactionReference,
                    receiptRef: item.transactionReference,
                    date: item.transactionDate?.slice(0, 10),
                    service: item.description,
                    amount: item.amount,
                }));;
                setReceipts(newData);
                setTotalPages(data.data.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Add serial numbers to wastes data
        fetchData()
    }, [currentPage]);


    const clearNotification = () => {
        setNotification(null);
    };



    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                clearNotification();
            }, 5000); // Hide after 5 seconds
            return () => clearTimeout(timer); // Cleanup timer on component unmount or notification change
        }
    }, [notification]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        // Assuming format is DD-MM-YY
        const [day, month, year] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    // --- Computed Properties ---
    const filteredReceipts = useMemo(() => {
        if (!searchQuery) {
            return receipts;
        }
        const lowerQuery = searchQuery.toLowerCase();
        return receipts.filter(receipt => {
            return (
                receipt.sn.toString().includes(lowerQuery) ||
                receipt.transactionRef.toLowerCase().includes(lowerQuery) ||
                receipt.receiptRef.toLowerCase().includes(lowerQuery) ||
                receipt.service.toLowerCase().includes(lowerQuery) ||
                receipt.amount.toLowerCase().includes(lowerQuery) ||
                formatDate(receipt.date).toLowerCase().includes(lowerQuery)
            );
        });
    }, [receipts, searchQuery]);

    const sortedReceipts = useMemo(() => {
        return [...filteredReceipts].sort((a, b) => {
            let valA = a[sortColumn];
            let valB = b[sortColumn];

            if (sortColumn === 'amount') {
                // Remove currency symbol and commas for numeric comparison
                valA = Number(valA.replace(/[^0-9.-]+/g, ''));
                valB = Number(valB.replace(/[^0-9.-]+/g, ''));
            } else if (sortColumn === 'sn') {
                // Numeric comparison for serial numbers
                valA = Number(valA);
                valB = Number(valB);
            } else if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }

            if (sortColumn === 'date') {
                // Convert dates to comparable format (handling en-dash)
                const cleanDateA = formatDate(valA);
                const cleanDateB = formatDate(valB);
                const [dayA, monthA, yearA] = cleanDateA.split('-').map(Number);
                const [dayB, monthB, yearB] = cleanDateB.split('-').map(Number);
                const dateA = new Date(2000 + yearA, monthA - 1, dayA);
                const dateB = new Date(2000 + yearB, monthB - 1, dayB);
                valA = dateA.getTime();
                valB = dateB.getTime();
            }

            let comparison = 0;
            if (valA > valB) {
                comparison = 1;
            } else if (valA < valB) {
                comparison = -1;
            }

            return sortDirection === 'dsc' ? (comparison * -1) : comparison;
        });
    }, [filteredReceipts, sortColumn, sortDirection]);





    // --- Methods ---
    const sortBy = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'dsc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };

    const sortIcon = (columnKey) => {
        if (sortColumn !== columnKey) return '↕';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Placeholder Action Methods
    const filterData = () => {
        console.log("Filter action triggered");
        setNotification({ type: 'error', message: 'Coming soon..' });
    };

    const exportData = () => {
        console.log("Export action triggered");
        setNotification({ type: 'error', message: 'Coming soon..' });
    };


    const handleDownload = (receiptId) => {
        localStorage.setItem('receiptId', receiptId);
        navigate("/receipt")
        console.log("Download receipt:", receiptId);


    };

    return (
        <div>
            <div className="flex sans h-screen">
                <Sidebar addkey="1" />
                <div className="flex-1 bg-zinc-100 min-h-screen overflow-y-auto">
                    <Topbar />
                    <div className="bg-zinc-100 font-sans">
                        <main className="p-4 md:px-4">
                            <div className="p-5 md:p-8 rounded-lg w-full mx-auto">
                                {/* Header */}
                                <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-xl md:text-2xl font-semibold text-zinc-800">Payment</h1>
                                        <span className='text-zinc-500'> Track your waste disposal</span>
                                    </div>
                                </div>


                                <PaymentNav />
                                {/* Search and Actions */}
                                <div className="flex lg:flex-row flex-col justify-between gap-4 mb-6">
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 text-green-700 flex items-center pl-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search receipts..."
                                            className="w-full lg:w-[24rem] pl-10 pr-4 py-2 border border-zinc-300 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            onClick={filterData}
                                            type="button"
                                            className="px-4 lg:mx-4 py-2 border border-zinc-300 text-sm font-medium rounded-xl text-zinc-700 bg-white hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Filter
                                        </button>
                                        <button
                                            onClick={exportData}
                                            type="button"
                                            className="px-4 py-2 mx-4 border border-zinc-300 lg:mx-0 text-sm font-medium rounded-xl text-zinc-700 bg-white hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Export
                                        </button>
                                    </div>
                                </div>
                                {/* Table */}
                                <div className="table-container border border-zinc-200 rounded-2xl">
                                    <table className="w-full min-w-[768px] text-sm text-left text-zinc-600">
                                        <thead className="font-light text-zinc-700 uppercase bg-white">
                                            <tr>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('sn')}>
                                                    <div className="flex items-center justify-between">
                                                        S/N <span className={`sort-icon ${sortColumn === 'sn' ? 'active' : ''}`}>
                                                            {sortIcon('sn')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('transactionRef')}>
                                                    <div className="flex items-center justify-between">
                                                        Transaction Ref <span className={`sort-icon ${sortColumn === 'transactionRef' ? 'active' : ''}`}>
                                                            {sortIcon('transactionRef')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('receiptRef')}>
                                                    <div className="flex items-center justify-between">
                                                        Receipt Ref <span className={`sort-icon ${sortColumn === 'receiptRef' ? 'active' : ''}`}>
                                                            {sortIcon('receiptRef')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('service')}>
                                                    <div className="flex items-center justify-between">
                                                        Service <span className={`sort-icon ${sortColumn === 'service' ? 'active' : ''}`}>
                                                            {sortIcon('service')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('amount')}>
                                                    <div className="flex items-center justify-between">
                                                        Amount <span className={`sort-icon ${sortColumn === 'amount' ? 'active' : ''}`}>
                                                            {sortIcon('amount')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('date')}>
                                                    <div className="flex items-center justify-between">
                                                        Date <span className={`sort-icon ${sortColumn === 'date' ? 'active' : ''}`}>
                                                            {sortIcon('date')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="pl-6 py-3 text-left">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedReceipts.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-10 text-zinc-500">No receipts found.</td>
                                                </tr>
                                            ) : (
                                                sortedReceipts.map((receipt) => (
                                                    <tr key={`${receipt.sn}-${receipt.transactionRef}`} className="bg-white border-b border-zinc-200 hover:bg-zinc-50 lg:h-20">
                                                        <td className="px-4 py-3 font-medium text-zinc-900">{receipt.sn}</td>
                                                        <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{receipt.transactionRef}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap">{receipt.receiptRef}</td>
                                                        <td className="px-4 py-3">{receipt.service}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(receipt.amount)}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap">{formatDate(receipt.date)}</td>
                                                        <td className="px-4 py-3 text-left">
                                                            <button
                                                                onClick={() => handleDownload(receipt.id)}
                                                                type="button"
                                                                className="p-1 text-zinc-500 hover:text-zinc-700 flex flex-row"
                                                            >
                                                                <svg className='h-4 w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#007836" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M7 10L12 15L17 10" stroke="#007836" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M12 15V3" stroke="#007836" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                <span className='px-4 text-green-700'>Download</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Pagination */}
                                <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                                    <span className="text-sm text-zinc-700">
                                        Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                                        <span className="mx-2">|</span>
                                        Total <span className="font-semibold">{receipts.length}</span> items
                                    </span>
                                    <div className="inline-flex rounded-md shadow-sm -space-x-px" role="group">
                                        <button
                                            onClick={() => changePage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            type="button"
                                            className="px-3 mr-4 py-2 text-sm font-medium text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 focus:z-10 focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => changePage(currentPage + 1)}
                                            disabled={currentPage === totalPages || totalPages === 0}
                                            type="button"
                                            className="px-3 py-2 text-sm font-medium text-zinc-50 bg-green-700 border border-zinc-300 hover:bg-green-600 focus:z-10 focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {notification && (
                                <div
                                    // Using fixed positioning to overlay on the page
                                    className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg max-w-sm z-50 ${notification.type === 'success' ? 'bg-green-100 border border-green-400 text-green-800' : 'bg-red-100 border border-red-400 text-red-800'
                                        }`}
                                    // ARIA roles for accessibility
                                    role={notification.type === 'error' ? 'alert' : 'status'}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">{notification.message}</p>
                                        {/* Close button for the notification */}
                                        <button
                                            onClick={clearNotification}
                                            className={`ml-4 text-xl font-semibold leading-none ${notification.type === 'success' ? 'text-green-800 hover:text-green-900' : 'text-red-800 hover:text-red-900'} focus:outline-none`}
                                            aria-label="Close notification"
                                        >
                                            &times; {/* Unicode multiplication sign for 'x' */}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PaymentReceipts;