// SmartBinDashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/FacilityMgrSideBar';
import Topbar from '../components/FacilityMgrTopBar';
import useFacilityMgrStore from '../store/useFacilityMgrStore';
import SmartBinApplicationsList from '../components/FacMgrSmartBinApplicationsList';
import SmartBinApplicationForm from '../components/FacMgrSmartBinApplicationForm';

const SmartBinDashboard = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [applicationsRefreshTrigger, setApplicationsRefreshTrigger] = useState(0); // Simple way to trigger refresh
    const facilityMgrInfo = useFacilityMgrStore.getState().facilityMgrInfo;

    const handleApplyClick = () => {
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    const handleFormSubmitSuccess = () => {
        setIsFormOpen(false);
        // Trigger a refresh of the application list in the child component
        setApplicationsRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="flex sans h-screen max-w-screen">
            <Sidebar addkey="1" />
            <div className=" bg-zinc-100 min-h-screen   flex flex-col flex-1 overflow-y-auto  ">
                <Topbar />
                <div className="bg-zinc-100 font-sans">
                    <main className="p-4 md:p-10">
                        {/* Pass necessary props like onApplyClick and refresh trigger */}
                        <SmartBinApplicationsList
                            onApplyClick={handleApplyClick}
                            refreshTrigger={applicationsRefreshTrigger} // Pass trigger to force re-fetch
                        />
                    </main>
                </div>
            </div>
            {/* Conditionally render the form component */}
            {isFormOpen && (
                <SmartBinApplicationForm
                    isOpen={isFormOpen}
                    onClose={handleFormClose}
                    onSubmitSuccess={handleFormSubmitSuccess}
                    initialFacilityMgrData={facilityMgrInfo}
                />
            )}
        </div>
    );
};

export default SmartBinDashboard;