import React from 'react';
import api from '../api/axiosConfig';

// --- CONSTANTS ---
const ADDRESS_LOADING_TEXT = 'Loading address...';
const ADDRESS_ERROR_TEXT = 'Could not load address.';

// --- HELPER COMPONENTS ---
const CustomSelect = ({ options, selected, onSelect, placeholder, disabled, isLoading }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef(null);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={selectRef}>
            <button
                type="button"
                disabled={disabled || isLoading}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-green-700 focus:border-green-700  p-3.5 text-left flex justify-between items-center disabled:bg-zinc-200 disabled:cursor-not-allowed"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={selected ? 'text-zinc-900' : 'text-zinc-500'}>
                    {isLoading ? 'Loading...' : (selected ? selected.name : placeholder)}
                </span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && !disabled && (
                <div
                    className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg border border-zinc-200"
                    role="listbox"
                >
                    <ul className="max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => handleSelect(option)}
                                className="px-4 py-2 text-zinc-700 hover:bg-green-100 cursor-pointer"
                                role="option"
                                aria-selected={selected?.id === option.id}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const IconInputField = ({ id, label, type, value, onChange, placeholder, icon, min, max }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-zinc-700">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={type === 'date' || type === 'time' ? min : undefined}
                max={type === 'time' ? max : undefined} // Example for time max
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full pl-10 p-3.5"
                required
            />
        </div>
    </div>
);

const TextareaField = ({ id, label, value, onChange, placeholder, disabled = false, isLoading }) => (
    <div className="relative">
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-zinc-700">
            {label}
        </label>
        {isLoading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg mt-8">
                <svg
                    className="animate-spin h-6 w-6 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
            </div>
        )}
        <textarea
            id={id}
            name={id}
            rows="4"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-3.5 disabled:bg-zinc-200"
        />
    </div>
);

// --- MAIN COMPONENT ---
const ScheduleWasteCollectionModal = ({
    isOpen,
    onClose,
    initialPickupData,
    onSubmit,
    pickUpAmount,
    notification,
    setNotification
}) => {
    const [formData, setFormData] = React.useState({
        branch: null,
        date: '',
        time: '',
        phoneNumber: '',
        address: '',

    });

    const [branchOptions, setBranchOptions] = React.useState([]);
    const [isFetchingBranches, setIsFetchingBranches] = React.useState(true);
    const [isFetchingDetails, setIsFetchingDetails] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Ref to track if initial data was already set
    const initialDataSetRef = React.useRef(false);

    // Effect to pre-populate form with initial data (only once)
    React.useEffect(() => {
        if (initialPickupData && !initialDataSetRef.current) {
            setFormData(prev => ({ ...prev, ...initialPickupData }));
            initialDataSetRef.current = true;
        }
    }, [initialPickupData]);

    // Effect to fetch branches on mount
    const fetchBranchesAPI = async () => {
        try {
            const { data } = await api.get('/corporate/fetch-branches');
            console.log("Branches fetched:", data);
            if (data.success) {
                let branches = data.data.data.map(branch => (
                    {
                        id: branch._id,
                        name: branch.branchName,
                        address: branch.branchAddress,
                    }));
                setBranchOptions(branches);
                setIsFetchingBranches(false);
            }
        } catch (error) {
            console.log("Failed to fetch branches:", error);
        }
    };
    React.useEffect(() => {
        fetchBranchesAPI();

    }, []);


    const handleBranchSelect = (branch) => {
        setFormData(prev => ({ ...prev, branch }));
        setIsFetchingDetails(true);

        const branchDetail = branchOptions.find(b => b.id === branch.id);

        if (branchDetail) {
            setFormData(prev => ({
                ...prev,
                address: branchDetail.address
            }));
        }
        setIsFetchingDetails(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.branch || !formData.date || !formData.time || !formData.phoneNumber) {
            console.warn("Please fill in all required fields.");
            return;
        }

        // Date validation (must be today or in the future)
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part for comparison
        if (selectedDate < today) {
            // In a real app, you'd set a notification here
            console.warn("Please select a date today or in the future.");
            return;
        }

        setIsSubmitting(true);
        try {
            // The parent component now handles the submission logic
            await onSubmit(formData);
            setFormData({
                branch: null,
                date: '',
                time: '',
                phoneNumber: '',
                address: '',
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    // Render nothing if the modal is not open
    if (!isOpen) {
        return null;
    }

    const handleClose = () => {
        setFormData({
            branch: null,
            date: '',
            time: '',
            phoneNumber: '',
            address: '',
        });
        onClose();
    }

    // Calculate min date for date input (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <div
            className="fixed inset-0 bg-zinc-950/70 bg-opacity-50 backdrop-blur-sm z-50 font-sans flex items-center justify-center min-h-screen overflow-y-auto p-4"
            aria-modal="true"
            role="dialog"
        >
            <main className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6 sm:p-8 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-800">Request for pickup</h2>
                        <p className="text-sm text-zinc-500 mt-1">Request for your waste to be disposed</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-zinc-400 hover:text-zinc-600"
                        aria-label="Close"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>



                <form onSubmit={handleSubmit} className="p-6 sm:p-8 pt-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-zinc-700">
                                Select branch
                            </label>
                            <CustomSelect
                                placeholder="Choose branch"
                                options={branchOptions}
                                selected={formData.branch}
                                onSelect={handleBranchSelect}
                                isLoading={isFetchingBranches}
                                disabled={isFetchingBranches}
                            />
                        </div>
                        <IconInputField
                            id="date"
                            label="Select date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            placeholder="Choose Date"
                            min={today}
                            icon={
                                <svg
                                    className="w-5 h-5 text-zinc-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <IconInputField
                            id="time"
                            label="Select time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            placeholder="Choose time"
                            // Example: Min time could be now + 2 hours, or a fixed time
                            // min={calculateMinTime()} 
                            icon={
                                <svg
                                    className="w-5 h-5 text-zinc-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            }
                        />
                        <IconInputField
                            id="phoneNumber"
                            label="Phone number"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+234"
                            icon={
                                <span className="text-zinc-500 text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                        />
                                    </svg>
                                </span>
                            }
                        />
                    </div>

                    <TextareaField
                        id="address"
                        label="Address"
                        value={formData.address || (isFetchingDetails ? ADDRESS_LOADING_TEXT : '')}
                        onChange={handleInputChange}
                        placeholder="Contact address"
                        disabled={true}
                        isLoading={isFetchingDetails}
                    />

                    <div className="flex items-center justify-between space-x-4 pt-4">
                        <div>
                            {pickUpAmount && (
                                <p className="text-lg font-bold text-zinc-800">Amount: {pickUpAmount}</p>
                            )}
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="px-8 py-3 text-sm font-semibold text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isFetchingDetails || !formData.branch}
                                className="px-8 py-3 text-sm font-semibold text-white bg-green-700 border border-transparent rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
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
                                        Processing...
                                    </>
                                ) : (
                                    'Make Payment'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ScheduleWasteCollectionModal;