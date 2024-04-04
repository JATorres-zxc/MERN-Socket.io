import React from 'react';
import { useAuthContext } from '../context/AuthContext';


const useLogout = () => {
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem('chat-user');
            setAuthUser(null);
        } catch (error) {
            console.error(error); 
        }
    };

    return { loading: false, logout }; 
};

export default useLogout;
