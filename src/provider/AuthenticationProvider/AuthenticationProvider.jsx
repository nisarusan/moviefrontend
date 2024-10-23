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
        let isMounted = true; // Dit is voor cleanup

        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            try {
                const decodedToken = jwtDecode(jwtToken);
                if (decodedToken.exp * 1000 < Date.now()) {
                    handleLogout();
                } else {
                    if (isMounted) {
                        setIsLoggedIn(true);
                        setUsername(decodedToken.sub);
                    }
                }
            } catch (error) {
                console.error('Error decoding token', error);
                handleLogout();
            }
        }

        // Cleanup functie
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchUserAuthorities = async () => {
            try {
                if (username && isMounted) {
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

        // Cleanup functie
        return () => {
            isMounted = false;
        };
    }, [username]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('jwtToken');
        window.location.href = '/';
    };

    return (
        <AuthenticationContext.Provider value={{ isLoggedIn, handleLogout, username, setUsername, userAuthorities }}>
            {children}
        </AuthenticationContext.Provider>
    );
};