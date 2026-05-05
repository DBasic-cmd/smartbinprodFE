// src/components/ScheduleWasteCollectionModal.jsx (or .js)
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // Adjust path as needed
import useCorporateStore from '../store/useCorporateStore'; // Adjust path as needed
import useAuthStore from '../store/authStore'; // Adjust path as needed

// Assuming these icons are defined or imported appropriately
// You might move these to a shared icons file or define them here if they are only used here
const CloseIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

const ScheduleWasteCollectionModal = ({
    isOpen,
    onClose,
    initialPickupData,
    onSubmit, // This will be handlePickupRequest from the parent
    pickUpAmount, // Pass amount for display if needed
    notification, // Pass notification state if needed inside modal
    setNotification, // Pass setNotification if needed inside modal
}) => {
    const Corporate = useCorporateStore((state) => state.corporateInfo);
    const noteOptions = ['An Occasion', 'An Emergency', 'Other reasons'];
    const [otherReason, setOtherReason] = useState('');
    const [pickupRequestData, setPickupRequestData] = useState(initialPickupData);

    // Reset form when modal opens/closes or initial data changes
    useEffect(() => {
        if (isOpen) {
            setPickupRequestData(initialPickupData);
            setOtherReason(''); // Reset other reason when modal opens
        }
    }, [isOpen, initialPickupData]);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handlePickupDataChange = (e) => {
        const { id, value } = e.target;
        setPickupRequestData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission if using form onSubmit
        // Basic validation can be done here or rely on parent
        if (pickupRequestData.note === "Other reasons" && !otherReason.trim()) {
            if (setNotification) {
                setNotification({ type: 'error', message: "Please specify the reason for pickup." });
            }
            return;
        }
        // Pass data back to parent for handling submission/payment
        onSubmit({ ...pickupRequestData, otherReason });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content lg:py-12 lg:px-8">
                <div className="flex justify-between items-center pb-6">
                    <div>
                        <h3 className="text-2xl font-semibold text-zinc-800">Request for pickup</h3>
                        <p className="text-zinc-500 mt-1">Request for your waste to be disposed</p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="text-zinc-700 hover:text-red-600 self-start"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form className="py-6 space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-zinc-700 mb-1">
                            Select date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={pickupRequestData.date}
                            onChange={handlePickupDataChange}
                            required
                            placeholder="choose date"
                            min={getTodayDate()}
                            className="form-input form-input-date relative pr-8"
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-zinc-700 mb-1">
                            Select time
                        </label>
                        <input
                            type="time"
                            id="time"
                            value={pickupRequestData.time}
                            onChange={handlePickupDataChange}
                            required
                            className="form-input form-input-time relative pr-8"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-1">
                            Phone number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={pickupRequestData.phone}
                            onChange={handlePickupDataChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-zinc-700 mb-1">
                            Address
                        </label>
                        <textarea
                            id="address"
                            value={pickupRequestData.address}
                            onChange={handlePickupDataChange}
                            required
                            rows="3"
                            className="form-input"
                            placeholder="Contact address"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="note" className="block text-sm font-medium text-zinc-700 mb-1">
                            Add Note
                        </label>
                        <select
                            id="note"
                            value={pickupRequestData.note}
                            onChange={handlePickupDataChange}
                            required
                            className="form-input"
                        >
                            <option disabled value="">Select reason for pickup</option>
                            {noteOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    {
                        pickupRequestData.note === "Other reasons" && (
                            <div>
                                <label htmlFor="other" className="block text-sm font-medium text-zinc-700 mb-1">
                                    Write other reason
                                </label>
                                <input
                                    type="text" // Changed from 'other' to 'text'
                                    id="other"
                                    value={otherReason}
                                    onChange={(e) => setOtherReason(e.target.value)}
                                    required // Make it required if 'Other reasons' is selected
                                    className="form-input form-input-time relative pr-8"
                                    placeholder="Specify reason"
                                />
                            </div>
                        )
                    }
                    <div className="py-4 flex justify-end">
                        <button
                            type="submit" // Changed to submit type
                            // onClick={handleSubmit} // Remove onClick if using onSubmit
                            className="btn btn-primary w-full text-sm rounded-xl"
                            disabled={!pickupRequestData.date || !pickupRequestData.time || !pickupRequestData.phone || !pickupRequestData.address || !pickupRequestData.note || (pickupRequestData.note === "Other reasons" && !otherReason.trim())} // Basic disable logic
                        >
                            Make Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleWasteCollectionModal;