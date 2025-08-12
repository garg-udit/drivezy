import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { getCurrentUser } from '../api/auth';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, []);

    // const login = useCallback(async (jwtToken) => {
    //     try {
    //         localStorage.setItem('token', jwtToken);
    //         setToken(jwtToken);

    //         const res = await getCurrentUser();
    //         let userData = res.data;

    //         if (userData.role === "PROVIDER" && userData.companyAdmin === true) {
    //             userData.role = "COMPANY_ADMIN"
    //         }

    //         setUser(userData);
    //         localStorage.setItem('user', JSON.stringify(userData));
    //     } catch (err) {
    //         console.error('Failed to get user', err);
    //         logout();
    //     }
    // }, [logout]);


    const login = useCallback(async (jwtToken) => {
        try {
            localStorage.setItem('token', jwtToken);
            setToken(jwtToken);

            const res = await getCurrentUser(jwtToken); // <-- FIXED here
            let userData = res.data;
            console.log("USER DATA", userData)

            if (userData.role === "PROVIDER" && userData.companyAdmin === true) {
                userData.role = "COMPANY_ADMIN";
            }

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            console.error('Failed to get user', err);
            logout();
        }
    }, [logout]);


    useEffect(() => {
        if (token && !user) {
            login(token);
        }
    }, [token, user, login]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
