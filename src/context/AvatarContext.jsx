import { createContext, useState, useEffect } from 'react';
import avatarDefault from '../assets/avatar.png';
import { useAuthentication } from '../provider/AuthenticationProvider/AuthenticationProvider.jsx';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const { username } = useAuthentication(); // Haal username uit je AuthenticationContext
    const [avatar, setAvatar] = useState(avatarDefault);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController(); // Maak een AbortController aan
        const signal = controller.signal;

        const fetchAvatar = async () => {
            if (username) {
                try {
                    const response = await fetch(`http://localhost:8080/api/images/download/${username}`, { signal });
                    if (response.ok) {
                        const blob = await response.blob();
                        const avatarUrl = URL.createObjectURL(blob);
                        setAvatar(avatarUrl);
                        localStorage.setItem('avatar', avatarUrl); // Sla avatar op in localStorage
                    } else {
                        console.error('Failed to fetch avatar, using default.');
                        setAvatar(avatarDefault);
                    }
                } catch (error) {
                    if (error.name === 'AbortError') {
                        console.log('Avatar fetch aborted');
                    } else {
                        console.error('Error fetching avatar:', error);
                        setAvatar(avatarDefault); // Gebruik default avatar bij fout
                    }
                } finally {
                    setLoading(false); // Zet loading state uit na het laden
                }
            } else {
                setAvatar(avatarDefault);
                setLoading(false);
            }
        };

        fetchAvatar();

        // Cleanup functie voor wanneer de component unmount
        return () => {
            controller.abort(); // Annuleer het fetch-verzoek als de component wordt ontladen
        };
    }, [username]);

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar, loading }}>
            {children}
        </AvatarContext.Provider>
    );
};