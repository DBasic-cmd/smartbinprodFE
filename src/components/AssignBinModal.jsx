import React, { useState, useEffect } from 'react';

// --- SVG ICONS (Heroicons) ---
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Assign Bin Modal Component ---
const AssignBinModal = ({ isOpen, onClose, onAssign, bin, tenants }) => {
    const [selectedTenant, setSelectedTenant] = useState('');

    useEffect(() => {
        // Set default tenant when modal opens or tenants list changes
        if (isOpen && tenants && tenants.length > 0) {
            setSelectedTenant(tenants[0]);
        }
    }, [isOpen, tenants]);

    // Don't render the modal if it's not open
    if (!isOpen) return null;

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedTenant) {
            alert('Please select a tenant.');
            return;
        }
        // Pass the bin and the selected tenant to the parent component
        onAssign(bin, selectedTenant);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600">
                    <CloseIcon />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900">Assign Bin</h2>
                    <p className="text-sm text-zinc-500">Add Bin to Tenant</p>
                </div>

                {/* Assignment Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="binId" className="block text-sm font-medium text-zinc-700 mb-1">Bin ID</label>
                        <input
                            type="text"
                            id="binId"
                            value={bin?.binId || ''}
                            disabled
                            className="w-full px-3 py-2 border border-zinc-300 rounded-md bg-zinc-100 text-zinc-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="tenantName" className="block text-sm font-medium text-zinc-700 mb-1">Tenant name</label>
                        <div className="relative">
                            <select
                                id="tenantName"
                                value={selectedTenant}
                                onChange={(e) => setSelectedTenant(e.target.value)}
                                className="w-full px-3 py-2 border border-zinc-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                                {tenants.map(tenant => (
                                    <option key={tenant} value={tenant}>{tenant}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Assign Bin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AssignBinModal


