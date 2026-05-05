import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed



import Sidebar from '../components/AgentSidebar';
import Topbar from '../components/AgentTopBar';
import ServiceConfigNav from '../components/AgentServiceConfigNav';

// --- API Endpoint (Placeholder) ---
const API_ENDPOINT = '/api/support/contact'; // Replace with your actual API endpoint

// --- FAQ Data ---
const faqData = [
    {
        id: 1,
        question: 'Question 1',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    },
    {
        id: 2,
        question: 'Question 2',
        answer: 'This is the answer to Question 2. Provide relevant information here to help users.',
    },
    {
        id: 3,
        question: 'Question 3',
        answer: 'Here is the detailed answer for Question 3. Explain the solution or provide necessary steps.',
    },
    // Add more questions as needed
];

// --- Inline SVG Loader ---
const InlineLoader = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// --- Reusable Accordion Item Component ---
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className=" border-zinc-200">
            {/* Question Header */}
            <button
                onClick={onClick}
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                aria-expanded={isOpen}
            >
                <span className="text-sm font-medium text-zinc-800">{question}</span>
                {/* Chevron Icon */}
                <svg
                    className={`w-4 h-4 text-zinc-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0' // Changed rotation for typical accordion behavior
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Using a simpler chevron-down which rotates up when open */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {/* Answer Section (Conditional Rendering) */}
            {isOpen && (
                <div className="pb-4 pr-10 text-xs text-zinc-600"> {/* Added right padding to align with question */}
                    {answer}
                </div>
            )}
        </div>
    );
};

// --- Contact Support Modal Component ---
const ContactSupportModal = ({ isOpen, onClose }) => {
    // --- State for Form Data, Loading, and Notifications within the Modal ---
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '+234', // Default prefix
        email: '',
        message: '',
    });
    const [attachment, setAttachment] = useState(null); // State for the file
    const [isDragging, setIsDragging] = useState(false); // State for drag-and-drop visual feedback
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string } | null

    // --- Input Change Handler ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        clearNotification();
    };

    // --- File Handling ---
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
            console.log("File selected:", e.target.files[0].name);
            clearNotification();
        }
    };

    // --- Drag and Drop Handlers ---
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Necessary to allow drop
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setAttachment(e.dataTransfer.files[0]);
            console.log("File dropped:", e.dataTransfer.files[0].name);
            clearNotification();
            // Optionally update the file input visually if needed, though not standard
            // document.getElementById('file-input').files = e.dataTransfer.files;
        }
    };

    // --- Clear Notification ---
    const clearNotification = () => {
        setNotification(null);
    };

    // --- Form Submission Handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        clearNotification();

        // Use FormData to send text fields and the file
        const dataToSend = new FormData();
        dataToSend.append('fullName', formData.fullName);
        dataToSend.append('phoneNumber', formData.phoneNumber);
        dataToSend.append('email', formData.email);
        dataToSend.append('message', formData.message);
        if (attachment) {
            dataToSend.append('attachment', attachment); // Key 'attachment' should match backend expectation
        }

        console.log('Sending contact data to API...');
        // Log FormData entries (for debugging, doesn't show file content)
        for (let pair of dataToSend.entries()) {
            console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
        }

        try {
            // --- Actual API call using axios ---
            const response = await axios.post(API_ENDPOINT, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });
            console.log('API Response:', response.data);

            setNotification({ type: 'success', message: response.data.message || 'Support request sent successfully!' });
            // Reset form and close modal after a short delay
            setTimeout(() => {
                setFormData({ fullName: '', phoneNumber: '+234', email: '', message: '' });
                setAttachment(null);
                onClose(); // Close the modal
            }, 2000); // Delay to allow user to see success message

        } catch (error) {
            console.error("Submission failed:", error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to send request. Please try again.';
            setNotification({ type: 'error', message: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    // --- Auto-dismiss notification ---
    useEffect(() => {
        if (notification && notification.type === 'error') { // Only auto-dismiss errors for now
            const timer = setTimeout(() => {
                clearNotification();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // --- Prevent rendering if modal is not open ---
    if (!isOpen) return null;

    // --- Modal JSX ---
    return (
        // Overlay
        <div
            className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose} // Close modal on overlay click
            aria-modal="true"
            role="dialog"
        >
            {/* Modal Content */}
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 text-2xl font-bold focus:outline-none"
                    aria-label="Close contact support modal"
                >
                    &times; {/* Unicode 'X' */}
                </button>

                {/* Modal Header */}
                <h2 className="text-lg font-semibold text-zinc-800 mb-4">Contact Support</h2>

                {/* Contact Form */}
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-xs font-medium text-zinc-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            required
                            className="w-full px-3 py-2 border border-zinc-300 rounded-md  text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-xs font-medium text-zinc-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+234"
                            required
                            className="w-full px-3 py-2 border border-zinc-300 rounded-md  text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-xs font-medium text-zinc-700 mb-1">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                            required
                            className="w-full px-3 py-2 border border-zinc-300 rounded-md  text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-xs font-medium text-zinc-700 mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Your Message"
                            required
                            className="w-full px-3 py-2 border border-zinc-300 rounded-md  text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none" // Added resize-none
                        ></textarea>
                    </div>

                    {/* File Attachment */}
                    <div className="mb-6">
                        <label className="block text-xs font-medium text-zinc-700 mb-1">Add Attachment</label>
                        <div
                            className={`flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 ${isDragging ? 'border-indigo-500' : 'border-zinc-300'
                                } border-dashed rounded-md appearance-none cursor-pointer hover:border-zinc-400 focus:outline-none`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="file-input"
                                className="sr-only" // Hide the default input visually but keep it accessible
                                onChange={handleFileChange}
                                accept=".svg, .png, .jpg, .jpeg" // Specify accepted file types
                            />
                            <label htmlFor="file-input" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                {/* Cloud Upload Icon (SVG) */}
                                <svg className="w-8 h-8 text-zinc-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                {attachment ? (
                                    <span className="text-sm text-zinc-600">{attachment.name}</span>
                                ) : (
                                    <>
                                        <span className="font-medium text-xs text-zinc-600">
                                            Click to upload or <span className="text-indigo-600">drag and drop</span>
                                        </span>
                                        <span className="text-xs text-zinc-500">SVG, PNG, JPG</span>
                                    </>
                                )}
                            </label>
                        </div>
                        {/* Optional: Add button to clear attachment */}
                        {attachment && (
                            <button
                                type="button"
                                onClick={() => setAttachment(null)}
                                className="mt-2 text-xs text-red-600 hover:underline focus:outline-none"
                            >
                                Remove attachment
                            </button>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end"> {/* Changed from justify-start to match image */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md  text-white ${isLoading
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                                } transition-colors duration-150 ease-in-out`}
                        >
                            {isLoading ? (
                                <>
                                    <InlineLoader />
                                    Sending...
                                </>
                            ) : (
                                'Send Message' // Changed button text to match common usage
                            )}
                        </button>
                    </div>

                    {/* Modal Notification Area */}
                    {notification && (
                        <div className={`mt-4 p-3 rounded-md text-sm ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`} role={notification.type === 'error' ? 'alert' : 'status'}>
                            {notification.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};


// --- Main Help & Support Page Component ---
function HelpAndSupportPage() {
    const [openAccordionId, setOpenAccordionId] = useState(faqData[0]?.id || null); // Open first question by default
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- Accordion Toggle Handler ---
    const handleAccordionToggle = (id) => {
        setOpenAccordionId(prevId => (prevId === id ? null : id)); // Toggle: close if already open, otherwise open clicked one
    };

    // --- Modal Control Handlers ---
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (


        <div className="flex sans h-screen max-w-screen">

            <Sidebar addkey="1" />
            <div className=" bg-zinc-100 min-h-screen   flex flex-col flex-1 overflow-y-auto  ">

                <Topbar />

                <div className="bg-zinc-100 font-sans">
                    <main className="p-4 md:px-4">
                        <div className="p-5 md:p-8 rounded-lg w-full  mx-auto">
                            {/* Header */}
                            <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
                                <div className="flex flex-col  gap-2">
                                    <h1 className="text-xl md:text-2xl font-semibold text-zinc-800">Service Configuration</h1>
                                    <span className='text-zinc-400 font-light'>Manage your preferences for our smart Bin Services </span>

                                </div>
                            </div>

                            <ServiceConfigNav />
                            <div className="bg-white p-6 md:p-8 lg:p-10 mx-auto my-10 rounded-lg border border-zinc-300 font-sans">
                                {/* Header */}
                                <div className="mb-6 border-b border-zinc-300 pb-4">
                                    <h1 className="text-xl font-semibold text-zinc-800">Help & Support</h1>
                                    <p className="text-sm text-zinc-500 mb-6">Get help and support for your smart bin related issues</p>
                                </div>


                                {/* FAQ Section */}
                                <div className="mb-10">
                                    <h2 className="text-2xl text-green-700 mb-4">Have any Questions</h2>
                                    {faqData.map((item) => (
                                        <AccordionItem
                                            key={item.id}
                                            question={item.question}
                                            answer={item.answer}
                                            isOpen={openAccordionId === item.id}
                                            onClick={() => handleAccordionToggle(item.id)}
                                        />
                                    ))}
                                </div>

                                {/* Contact Support Link/Button */}
                                <div className="text-center pt-6">
                                    <p className="text-sm text-zinc-600">
                                        Didn't see what you were looking for?{' '}
                                        <button
                                            onClick={openModal}
                                            className="font-medium text-green-600 hover:text-green-800 hover:underline focus:outline-none"
                                        >
                                            Contact Support
                                        </button>
                                    </p>
                                </div>

                                {/* Render the Modal */}
                                <ContactSupportModal isOpen={isModalOpen} onClose={closeModal} />

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>

    );
}

export default HelpAndSupportPage;
