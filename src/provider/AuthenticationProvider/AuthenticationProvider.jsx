import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const AuthenticationContext = createContext();
export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userAuthorities, setUserAuthorities] = useState();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            try {
                // Decodeer de token en controleer vervaldatum
                const decodedToken = jwtDecode(jwtToken);

                // Controleer of de token is verlopen
                if (decodedToken.exp * 1000 < Date.now()) {
                    handleLogout();
                } else {
                    // Token is nog geldig, zet de state
                    setIsLoggedIn(true);
                    setUsername(decodedToken.sub);
                }
            } catch (error) {
                console.error('Error decoding token', error);
                handleLogout();
            }
        }
    }, []);

    useEffect(() => {
        const fetchUserAuthorities = async () => {
            try {
                if (username) {
                    const response = await axios.get(`http://localhost:8080/users/${username}/authorities`);
                    const authorities = response.data.map(authority => {
                        if (authority.authority === 'ROLE_USER') {
                            return 'Gebruiker';
                        } else if (authority.authority === 'ROLE_ADMIN') {
                            return 'ADMIN';
                        } else {
                            return authority.authority;
                        }
                    });
                    setUserAuthorities(authorities);
                }
            } catch (error) {
                console.error('Error fetching user authorities:', error);
            }
        };

        fetchUserAuthorities();
    }, [username]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('jwtToken');
        window.location.href = '/'; // Verwijs naar de homepagina
    };

    return (
        <AuthenticationContext.Provider value={{ isLoggedIn, handleLogout, username, setUsername, userAuthorities }}>
            {children}
        </AuthenticationContext.Provider>
    );
};