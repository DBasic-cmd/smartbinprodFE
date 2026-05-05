
import { NavLink } from "react-router-dom";
import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentNav = () => {

    const location = useLocation();







    return (
        <>
            {/* Mobile Menu Toggle Button */}


            {/* Backdrop Overlay */}



            {/* Sidebar */}
            <div className="flex flex-row gap-4 my-2  w-full py-4 border-zinc-200 ">
                <NavLink
                    to="/payments">
                    <p className={`items-left justify-start p-2 ${location.pathname === '/payments' ? 'text-green-700 border-b-2  border-green-700' : 'text-zinc-700'}`}>
                        History
                    </p>
                </NavLink>
                <NavLink
                    to="/receipts">
                    <p className={`items-left justify-start p-2 ${location.pathname === '/receipts' ? 'text-green-700 border-b-2  border-green-700' : 'text-zinc-700'}`}>
                        Receipts
                    </p>
                </NavLink>
                <NavLink
                    to="/wallet">
                    <p className={`items-left justify-start p-2  ${location.pathname === '/wallet' ? 'text-green-700 border-b-2  border-green-700' : 'text-zinc-700'}`}>
                        Wallet & cards
                    </p>
                </NavLink>
            </div>

        </>
    );
};

// SVG Components



export default PaymentNav;