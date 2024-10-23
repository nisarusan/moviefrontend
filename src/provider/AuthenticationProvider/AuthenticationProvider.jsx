import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import HomePage from "../../pages/HomePage/HomePage.jsx";
const AuthenticationContext = createContext();
export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};


//AuthenticationProvider controleert of een gebruiker is ingelogd en of de JWT-token aanwezig is op elke pagina
export const AuthenticationProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userAuthorities, setUserAuthorities] = useState();


    useEffect(() => {
        // Nodig om te kijken of JWT token bestaat in local storage
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            setIsLoggedIn(true);
            //Decodeer token om user / gebruikersnaam informatie te decrypten
            const decodedToken = jwtDecode(jwtToken);

            // Extract gebruikersnaam van token;
            const { sub: username } = decodedToken;

            // Zet de gebruikersnaam state
            setUsername(username);
        }
    }, []);

    useEffect(() => {
        const fetchUserAuthorities = async () => {
            try {
                if (username) {
                    const response = await axios.get(`http://localhost:8080/users/${username}/authorities`);
                    const authorities = response.data.map(authority => {
                        //Gebruikersrol definieren
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
        // Perform logout actions here (e.g., clear authentication state)
        setIsLoggedIn(false);
        localStorage.removeItem('jwtToken'); // Clear token from localStorage

        // Navigate to the home page
        window.location.href = '/'; // Replace '/' with the actual URL of your home page
    };

    return (
        <AuthenticationContext.Provider value={{ isLoggedIn, handleLogout, username, setUsername, userAuthorities }}>
            {children}
        </AuthenticationContext.Provider>
    );
};