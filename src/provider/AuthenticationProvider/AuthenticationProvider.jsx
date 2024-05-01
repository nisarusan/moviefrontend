import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from "jwt-decode";
const AuthenticationContext = createContext();
export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if JWT token exists in local storage
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            setIsLoggedIn(true);
            // Decode the token to extract user information
            const decodedToken = jwtDecode(jwtToken);

            // Extract the username from the decoded token
            const { sub: username } = decodedToken;

            // Set the username state
            setUsername(username);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwtToken');
    };

    return (
        <AuthenticationContext.Provider value={{ isLoggedIn, handleLogout, username, setUsername }}>
            {children}
        </AuthenticationContext.Provider>
    );
};