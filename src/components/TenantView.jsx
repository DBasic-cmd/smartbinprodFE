import React, { useState, useEffect } from 'react';

// --- Helper Components & Icons ---

// Loading Spinner SVG Icon
const LoadingSpinner = () => (
    <svg
        className="animate-spin h-8 w-8 text-zinc-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

// Close (X) SVG Icon from Heroicons
const XMarkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// A single detail item component for reusability
const DetailItem = ({ label, value, highlight = false }) => (
    <div>
        <p className="text-sm text-zinc-500">{label}</p>
        <p
            className={`text-base font-medium ${highlight ? 'text-green-600' : 'text-zinc-900'}`}
        >
            {value || '-'}
        </p>
    </div>
);


// --- Main Component: TenantDetailsSideBar ---

const TenantDetailsSideBar = ({ tenantId, isOpen, onClose }) => {
    const [tenantData, setTenantData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Mock API call simulation
    useEffect(() => {
        // Don't fetch if the sidebar is closed or there's no ID
        if (!isOpen || !tenantId) {
            return;
        }

        const fetchTenantData = async () => {
            setIsLoading(true);
            setTenantData(null); // Clear previous data

            // Simulate a network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, you would fetch from your API:
            // try {
            //   const response = await fetch(`/api/tenants/${tenantId}`);
            //   const data = await response.json();
            //   setTenantData(data);
            // } catch (error) {
            //   console.error("Failed to fetch tenant data:", error);
            //   // Handle error state here
            // } finally {
            //   setIsLoading(false);
            // }

            // Mock data for demonstration
            const mockData = {
                dateAdded: '26-05-25',
                payerId: 'N-9013',
                firstName: 'Jacob',
                lastName: 'Adetunji',
                email: 'jacobtunji@gmail.com',
                phone: '+23481382913',
                lawmaType: 'Existing',
                binType: 'Smart Bin',
                binId: '#123456',
                binStatus: 'Assigned',
                buildingName: 'Park View',
                buildingType: 'Duplex',
                houseNumber: '2A',
                flatNumber: null,
                localGovernment: 'Ikeja north',
                closestLandmark: 'Oba Ajran Mosque',
                fullAddress: '2A Adeniji Road, Oba Akran Ikeja, Lagos State',
            };
            setTenantData(mockData);
            setIsLoading(false);
        };

        fetchTenantData();
    }, [tenantId, isOpen]); // Rerun effect if ID or open state changes

    // Handle Escape key press to close the sidebar
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 overflow-hidden">
                {/* Background overlay */}
                <div
                    className="absolute inset-0 bg-zinc-800 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                    <div
                        className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700"
                    >
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            {/* Header */}
                            <div className="px-4 sm:px-6 py-4 border-b border-zinc-200">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-semibold text-zinc-900" id="slide-over-title">
                                        Tenant details
                                    </h2>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                                        <LoadingSpinner />
                                    </div>
                                )}

                                {tenantData && !isLoading && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                                            <DetailItem label="Date added" value={tenantData.dateAdded} />
                                            <DetailItem label="Payer ID" value={tenantData.payerId} />
                                            <DetailItem label="First Name" value={tenantData.firstName} />
                                            <DetailItem label="Last Name" value={tenantData.lastName} />
                                            <DetailItem label="Email address" value={tenantData.email} />
                                            <DetailItem label="Phone number" value={tenantData.phone} />
                                            <DetailItem label="LAWMA Type" value={tenantData.lawmaType} />
                                            <DetailItem label="Bin type" value={tenantData.binType} />
                                            <DetailItem label="Bin ID" value={tenantData.binId} />
                                            <DetailItem label="Bin status" value={tenantData.binStatus} highlight={tenantData.binStatus === 'Assigned'} />
                                            <DetailItem label="Building name" value={tenantData.buildingName} />
                                            <DetailItem label="Building type" value={tenantData.buildingType} />
                                            <DetailItem label="House number" value={tenantData.houseNumber} />
                                            <DetailItem label="Flat number" value={tenantData.flatNumber} />
                                            <DetailItem label="Local Government" value={tenantData.localGovernment} />
                                            <DetailItem label="Closest Landmark" value={tenantData.closestLandmark} />
                                        </div>
                                        <div>
                                            <DetailItem label="Full address" value={tenantData.fullAddress} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Demo Component: How to use the sidebar ---

export default function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedTenantId, setSelectedTenantId] = useState(null);

    const handleOpenSidebar = (tenantId) => {
        setSelectedTenantId(tenantId);
        setSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
        setSelectedTenantId(null); // Optional: clear the ID when closing
    };

    return (
        <div className="bg-zinc-100 min-h-screen flex flex-col items-center justify-center font-sans p-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Sidebar Component Demo</h1>
                <p className="text-zinc-600 mb-6">Click the button to open the tenant details sidebar.</p>
                <button
                    onClick={() => handleOpenSidebar('tenant-123')}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                    Show Tenant Details
                </button>
            </div>

            {/* The Sidebar Component */}
            <TenantDetailsSideBar
                tenantId={selectedTenantId}
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
            />
        </div>
    );
}
