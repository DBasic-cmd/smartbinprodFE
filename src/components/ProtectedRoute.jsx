import { useEffect, useRef, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useTokenStore from "../store/tokenStore";
import useResidentStore from '../store/useResidentStore';

// Custom hook for inactivity timer
const useInactivityTimer = (logoutCallback, timeout = 12300000) => {
    const timerRef = useRef();

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(logoutCallback, timeout);
    }, [logoutCallback, timeout]);

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

        // Set up event listeners
        events.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        // Initial timer setup
        resetTimer();

        // Cleanup function
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetTimer]);
};



const ProtectedRoute = ({ children }) => {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const clearToken = useTokenStore((state) => state.clearBearerToken);
    const clearResident = useResidentStore((state) => state.clearResidentInfo);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        logout();
        localStorage.clear()
        clearToken();
        clearResident();
        navigate("/");
    }, [logout, clearToken, clearResident, navigate]);

    // Initialize inactivity timer and session check
    useInactivityTimer(handleLogout);

    return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
