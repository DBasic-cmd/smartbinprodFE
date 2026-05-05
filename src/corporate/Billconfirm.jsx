import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/CorporateTopBar';
import api from '../api/axiosConfig';
import useAuthStore from '../store/authStore';

function BillConfirm() {



    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const [time, setTime] = useState(60);
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

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

    const handleChange = (e, index) => {
        const val = e.target.value.replace(/\D/, ''); // Only digits
        const newCode = [...code];
        newCode[index] = val;
        setCode(newCode);

        if (val && index < (code.length - 1)) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (code[index]) {
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
            } else if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    };



    // const title = 'Where is my Smart Bin?';




    // const trackOrder = () => {
    //     console.log("Tracking order:", orderIdInput || orderDetails.id);
    // };
    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime == 0) {
                    return 0
                }
                return prevTime - 1
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    const handleSubmit = async () => {
        try {
            const response = await api.post("/Utility/validate-otp",
                {
                    token: code.join(""),
                    userID: useAuthStore.getState().token,

                }
            );
            const data = await response.data;
            if (data.succeeded) {
                setNotification({ type: 'success', message: 'Submitted successfully!' });
                navigate('/success');
            }
            else {
                setNotification({ type: 'error', message: data.message || 'Wrong otp or timed out!' });
            }
        } catch (error) {
            setNotification({ type: 'error', message: 'Error during login' });
            console.error("Error during login", error)

        }

    }

    return (

        <div className="flex sans h-screen max-w-screen">

            <Sidebar addkey="1" />
            <div className=" bg-zinc-100 min-h-screen   flex flex-col flex-1 overflow-y-auto  ">

                <Topbar />




                <div className='flex lg:flex-row flex-col items-center justify-between px-6 py-4 '>
                    <div className=' text-xl text-zinc-800'>
                        ← Back
                    </div>

                </div>
                <section className=" flex items-center justify-center lg:max-w-7xl mx-auto my-36 px-4 sm:px-6 lg:px-8">

                    <div className=" flex flex-col  bg-white lg:p-12 p-6">
                        <div className="max-w-md  ">
                            <h2 className="text-3xl font-bold mb-1 sans">Confirm It’s you</h2>
                            <p className="text-zinc-400 mb-8">
                                Enter the 5 digit code that was sent to your email address
                            </p>

                            <label className="block text-left font-medium mb-2 text-black text-lg">Enter Code</label>
                            <div className="flex gap-3 mb-6">
                                {code.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        maxLength="1"
                                        className="w-10 h-12 text-center border border-zinc-300 rounded-lg text-2xl outline-none focus:ring-2 focus:ring-green-600"
                                        value={digit}
                                        onChange={(e) => handleChange(e, idx)}
                                        onKeyDown={(e) => handleKeyDown(e, idx)}
                                        ref={(el) => (inputs.current[idx] = el)}
                                    />
                                ))}
                            </div>



                            <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg text-lg mb-6" onClick={handleSubmit}>
                                Continue
                            </button>



                            <div className="flex justify-between text-sm text-zinc-700">
                                <p>
                                    Didn’t get code?{" "}
                                    <button className="text-green-700 font-medium  underline">
                                        Resend
                                    </button>
                                </p>
                                <p className="text-red-500 font-medium"> {`${time}secs`}</p>
                            </div>
                        </div>
                    </div>



                </section>
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
        </div>
    );
}

export default BillConfirm;