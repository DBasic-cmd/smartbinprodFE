import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/AgentSidebar';
import Topbar from '../components/AgentTopBar';
import useAgentStore from '../store/useAgentStore';
import useAuthStore from '../store/authStore';
import api from '../api/axiosConfig';
import ServiceConfigNav from '../components/AgentServiceConfigNav';

const DotsVerticalIcon = ({ onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-zinc-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
);

const ClientPreferences = () => {
    // --- State ---
    const [preferences, setPreferences] = useState([
        {id : "23sfv", sn : 1, name: "Adebimpe Soriyan", customerType : "Resident", wasteCollectionSchedule : "1 months", expiration : "23 days left"},
        {id : "2334sfv", sn : 2, name: "Blueway Limited", customerType : "Corporate", wasteCollectionSchedule : "6 months", expiration : "23 days left"},
        {id : "23ersfv", sn : 3, name: "Soya Limited Enteprises", customerType : "Resident", wasteCollectionSchedule : "1 year", expiration : "23 days left"},
        {id : "2356sfv", sn : 4, name: "Martins Madueke", customerType : "Corporate", wasteCollectionSchedule : "3 months", expiration : "Expired"},
        {id : "23dgbdfgsfv", sn : 5, name: "Fisayo Mabel", customerType : "Resident", wasteCollectionSchedule : "6 months", expiration : "23 days left"},
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('dsc');
    const [currentPage, setCurrentPage] = useState(1);
    const [notification, setNotification] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [activeActionMenu, setActiveActionMenu] = useState(null);

    const handleActionMenuToggle = (userId) => {
        setActiveActionMenu(activeActionMenu === userId ? null : userId);
    };



    // const fetchData = async () => {
    //     try {
    //         const { data } = await api.get(`/Wallet/my-transaction-history?AccountNo=${useAgentStore.getState().agentInfo.accountNo}&PageNo=${currentPage}&PageSize=${itemsPerPage}`);
    //         if (data.succeeded) {
    //             const newData = data.data.data.map((item, index) => ({
    //                 sn: index + 1 + (currentPage - 1) * itemsPerPage,
    //                 id: item.id,
    //                 transactionRef: item.transactionReference,
    //                 date: item.transactionDate?.slice(0, 10),
    //                 service: item.description,
    //                 status: item.transactionStatus,
    //                 amount: item.amount,
    //                 paymentMethod: item.paymentMethod
    //             }));;
    //             setPreferences(newData);
    //             setTotalPages(data.data.totalPages);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     // Add serial numbers to wastes data
    //     fetchData()
    // }, [currentPage]);

 

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






    // --- Computed Properties ---
    const filteredPreferences = useMemo(() => {
        if (!searchQuery) {
            return preferences;
        }
        const lowerQuery = searchQuery.toLowerCase();
        return preferences.filter(preference => {
            return (
                preference.name.toLowerCase().includes(lowerQuery)
            )
        });
    }, [preferences, searchQuery]);

    const sortedPreferences = useMemo(() => {
        return [...filteredPreferences].sort((a, b) => {
            let valA = a[sortColumn];
            let valB = b[sortColumn];

          

            let comparison = 0;
            if (valA > valB) {
                comparison = 1;
            } else if (valA < valB) {
                comparison = -1;
            }

            return sortDirection === 'dsc' ? (comparison * -1) : comparison;
        });
    }, [filteredPreferences, sortColumn, sortDirection]);




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








    
    return (


        <div>
            <div className="flex sans h-screen max-w-screen">

                <Sidebar addkey="1" />
                <div className=" bg-zinc-100 min-h-screen   flex flex-col flex-1 overflow-y-auto  ">

                    <Topbar />
                    <div className="bg-zinc-100 font-sans">
                        <main className="p-4 ">
                            <div className="p-5 md:p-8 rounded-lg w-full  mx-auto">
                                {/* Header */}
                                <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
                                    <div className="flex flex-col  gap-2">
                                        <h1 className="text-xl md:text-2xl font-semibold text-zinc-800">Payment</h1>
                                        <span className='text-zinc-500'> Track your waste disposal</span>

                                    </div>
                                </div>

                                <ServiceConfigNav />


                                



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
                                            placeholder="Search preferences..."
                                            className="w-full lg:w-[24rem] pl-10 pr-4 py-2 border border-zinc-300 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="table-container border border-zinc-200 rounded-2xl">
                                    <table className="w-full min-w-[768px] text-sm text-left text-zinc-600">
                                        <thead className="font-light text-zinc-700 uppercase bg-white">






                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-center" onClick={() => sortBy('sn')}>S/N</th>

                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('name')}>
                                                    <div className="flex items-center justify-between">
                                                        Name <span className={`sort-icon ${sortColumn === 'name' ? 'active' : ''}`}>
                                                            {sortIcon('name')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('customerType')}>
                                                    <div className="flex items-center justify-between">
                                                        Customer Type <span className={`sort-icon ${sortColumn === 'customerType' ? 'active' : ''}`}>
                                                            {sortIcon('customerType')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('wasteCollectionSchedule')}>
                                                    <div className="flex items-center justify-between">
                                                        Waste Collection Schedule <span className={`sort-icon ${sortColumn === 'wasteCollectionSchedule' ? 'active' : ''}`}>
                                                            {sortIcon('wasteCollectionSchedule')}
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3" role="button" onClick={() => sortBy('expiration')}>
                                                    <div className="flex items-center justify-between">
                                                        Expiration <span className={`sort-icon ${sortColumn === 'expiration' ? 'active' : ''}`}>
                                                            {sortIcon('expiration')}
                                                        </span>
                                                    </div>
                                                </th>
                                               <th scope="col" className="px-4 py-3 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedPreferences.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-10 text-zinc-500">No preferences found.</td>
                                                </tr>
                                            ) : (
                                                sortedPreferences.map((item, index) => (
                                                    <tr key={item.id} className="bg-white border-b border-zinc-200 hover:bg-zinc-50 lg:h-20">
                                                        <td className="px-4 py-3 text-center">
                                                            <span className="text-sm font-medium text-zinc-900">{item.sn}</span>
                                                        </td>
                                                        <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{item.name}</td>
                                                        <td className="px-4 py-3">{item.customerType}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap">{item.wasteCollectionSchedule}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap">{item.expiration}</td>
                                                        <td className="py-4 px-6 text-sm text-zinc-500 relative">
                                                            <DotsVerticalIcon onClick={() => handleActionMenuToggle(app.id)} />
                                                            {activeActionMenu === item.id && (
                                                                <div className="absolute right-8 top-0 z-10 w-48 bg-white rounded-xl shadow-lg border border-zinc-200">
                                                                    <a href="#" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100">Edit</a>
                                                                    <a href="#"  className="block px-4 py-2 text-sm text-red-600 hover:bg-zinc-100">Delete</a>
                                                                </div>
                                                            )}
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
                                        Total <span className="font-semibold">{preferences.length}</span> items
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
                        </main>
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
        </div>
    );
};

export default ClientPreferences;