import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";



const SmartWasteSignup = () => {
    const [selectedOption, setSelectedOption] = useState('corporate');
    const [submittedOption, setSubmittedOption] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedOption) {
            return;
        }
        console.log("Selected Option:", selectedOption);
        setSubmittedOption(selectedOption);

        if (selectedOption === 'corporate') {
            navigate('/corporateonboard');
        }

        else if (selectedOption === 'agent') {
            navigate('/agentonboard');
        }
        else if (selectedOption === 'facilitymgr') {
            navigate('/facilitymanageronboard');
        }
        // else if (selectedOption === 'corporate') {
        //     navigate('/corporateonboard');
        // }

    };



    return (

        <div className="flex min-h-screen flex-col lg:flex-row bg-white">
            {/* Left Panel */}
            <div className="lg:w-7/12 w-full h-full flex flex-col  lg:px-36 px-8 py-12 bg-white">
                <p className='text-zinc-400 text-2xl py-8'>Powered by:</p>
                {/* Logos */}
                <div className="flex flex-wrap gap-6 mb-8 items-center justify-start">
                    <img src="/images/lagosmewr.png" alt="Lagos" className="h-12 object-contain" />
                    <img src="/images/lawma-logo.png" alt="LAWMA" className="h-12 object-contain" />
                    <img src="/images/wema-logo.png" alt="Wema Bank" className="h-12 object-contain" />
                </div>



                <main className="flex justify-start items-start my-20 ">
                    <div className="bg-white rounded-lg w-full max-w-xl">
                        <div className="mb-8">
                            <h1 className="text-2xl lg:text-3xl text-zinc-900 mb-3">
                                How would you like to join our smart waste community?
                            </h1>
                            <p className="text-zinc-900 text-sm lg:text-base font-light">
                                Experience the power of smart waste management. Sign up now and discover a cleaner, greener world.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4 mb-8">
                                {/* Corporate Option */}
                                <div className="relative">
                                    <input
                                        type="radio"
                                        id="corporate"
                                        name="userType"
                                        value="corporate"
                                        checked={selectedOption === 'corporate'}
                                        onChange={() => setSelectedOption('corporate')}
                                        className="sr-only peer"
                                    />
                                    <label
                                        htmlFor="corporate"
                                        className={`flex justify-between items-center w-full p-4 border rounded-lg cursor-pointer transition duration-150 ease-in-out peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-green-700 ${selectedOption === 'corporate'
                                            ? 'border-green-700 text-green-700 ring-1 ring-green-700'
                                            : 'border-zinc-300 text-zinc-800 hover:border-zinc-400'
                                            }`}
                                    >
                                        <span className="font-medium">A corporate</span>
                                        <span
                                            className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${selectedOption === 'corporate' ? 'border-green-700 bg-white' : 'border-zinc-400 bg-white'
                                                }`}
                                        >
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full transition-transform duration-150 ease-in-out ${selectedOption === 'corporate' ? 'bg-green-700 scale-100' : 'scale-0'
                                                    }`}
                                            ></span>
                                        </span>
                                    </label>
                                </div>

                                {/* Corporate Option */}
                                <div className="relative">
                                    <input
                                        type="radio"
                                        id="corporate"
                                        name="userType"
                                        value="corporate"
                                        checked={selectedOption === 'corporate'}
                                        onChange={() => setSelectedOption('corporate')}
                                        className="sr-only peer"
                                    />
                                    <label
                                        htmlFor="corporate"
                                        className={`flex justify-between items-center w-full p-4 border rounded-lg cursor-pointer transition duration-150 ease-in-out peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-green-700 ${selectedOption === 'corporate'
                                            ? 'border-green-700 text-green-700 ring-1 ring-green-700'
                                            : 'border-zinc-300 text-zinc-800 hover:border-zinc-400'
                                            }`}
                                    >
                                        <span className="font-medium">Corporate body</span>
                                        <span
                                            className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${selectedOption === 'corporate' ? 'border-green-700 bg-white' : 'border-zinc-400 bg-white'
                                                }`}
                                        >
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full transition-transform duration-150 ease-in-out ${selectedOption === 'corporate' ? 'bg-green-700 scale-100' : 'scale-0'
                                                    }`}
                                            ></span>
                                        </span>
                                    </label>
                                </div>

                                {/* Agent Option */}
                                <div className="relative">
                                    <input
                                        type="radio"
                                        id="agent"
                                        name="userType"
                                        value="agent"
                                        checked={selectedOption === 'agent'}
                                        onChange={() => setSelectedOption('agent')}
                                        className="sr-only peer"
                                    />
                                    <label
                                        htmlFor="agent"
                                        className={`flex justify-between items-center w-full p-4 border rounded-lg cursor-pointer transition duration-150 ease-in-out peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-green-700 ${selectedOption === 'agent'
                                            ? 'border-green-700 text-green-700 ring-1 ring-green-700'
                                            : 'border-zinc-300 text-zinc-800 hover:border-zinc-400'
                                            }`}
                                    >
                                        <span className="font-medium">An agent</span>
                                        <span
                                            className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${selectedOption === 'agent' ? 'border-green-700 bg-white' : 'border-zinc-400 bg-white'
                                                }`}
                                        >
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full transition-transform duration-150 ease-in-out ${selectedOption === 'agent' ? 'bg-green-700 scale-100' : 'scale-0'
                                                    }`}
                                            ></span>
                                        </span>
                                    </label>
                                </div>

                                {/* Facility manager Option */}
                                <div className="relative">
                                    <input
                                        type="radio"
                                        id="facilitymgr"
                                        name="userType"
                                        value="facilitymgr"
                                        checked={selectedOption === 'facilitymgr'}
                                        onChange={() => setSelectedOption('facilitymgr')}
                                        className="sr-only peer"
                                    />
                                    <label
                                        htmlFor="facilitymgr"
                                        className={`flex justify-between items-center w-full p-4 border rounded-lg cursor-pointer transition duration-150 ease-in-out peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-green-700 ${selectedOption === 'agent'
                                            ? 'border-green-700 text-green-700 ring-1 ring-green-700'
                                            : 'border-zinc-300 text-zinc-800 hover:border-zinc-400'
                                            }`}
                                    >
                                        <span className="font-medium">A Facility Manager</span>
                                        <span
                                            className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${selectedOption === 'facilitymgr' ? 'border-green-700 bg-white' : 'border-zinc-400 bg-white'
                                                }`}
                                        >
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full transition-transform duration-150 ease-in-out ${selectedOption === 'facilitymgr' ? 'bg-green-700 scale-100' : 'scale-0'
                                                    }`}
                                            ></span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!selectedOption}
                                className={`w-full py-3 px-6 text-white rounded-lg font-semibold transition duration-150 ease-in-out mb-6 ${selectedOption
                                    ? 'bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700'
                                    : 'bg-zinc-400 cursor-not-allowed'
                                    }`}
                            >
                                Continue
                            </button>

                            <p className="text-sm text-zinc-600">
                                I already have an account
                                <NavLink to="/">
                                    <span

                                        className="font-medium text-green-700 hover:underline focus:outline-none focus:ring-1 focus:ring-green-700 rounded ml-1"
                                    >
                                        Log into account
                                    </span>
                                </NavLink>
                            </p>

                            {submittedOption && (
                                <div className="mt-6 p-3 border border-zinc-200 rounded bg-zinc-50 text-center">
                                    <p className="text-sm text-zinc-700">
                                        Proceeding as: <strong className="font-medium">{submittedOption}</strong>
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </main>




            </div>

            {/* Right Panel */}
            <div className="hidden lg:flex w-5/12 items-center justify-center bg-[url(/images/smilebin.jpg)] relative overflow-hidden bg-cover bg-no-repeat bg-center">

                <div className='absolute top-0 my-14   '>
                    <div className=" z-20 flex flex-row items-center gap-4">
                        <img src="/images/sealLogo.svg" alt="Lagos Seal" className="h-20 mb-1 p-2" />
                        <p className="text-white font-medium text-sm uppercase tracking-wide">
                            Utilities Service Provider Initiative by<br />The Lagos State Government
                        </p>
                    </div>
                </div>


                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white px-6 py-4 text-center z-20">
                    <p className="text-lg">“Experience the power of smart waste management. Sign up now and discover a cleaner, greener world”</p>
                </div>
            </div>
        </div>

    );
};

export default SmartWasteSignup;




