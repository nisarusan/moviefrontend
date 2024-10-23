import { createContext, useState, useEffect } from 'react';
import defaultAvatar from '../assets/avatar.png';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || defaultAvatar);

    useEffect(() => {
        // Haal de avatar op bij het laden van de app, indien nog niet in localStorage
        if (!localStorage.getItem('avatar')) {
            const fetchAvatar = async () => {
                const username = localStorage.getItem('username'); // Username opgeslagen tijdens login
                if (username) {
                    try {
                        const response = await fetch(`http://localhost:8080/api/images/download/${username}`);
                        if (response.ok) {
                            const blob = await response.blob();
                            const avatarUrl = URL.createObjectURL(blob);
                            setAvatar(avatarUrl);
                            localStorage.setItem('avatar', avatarUrl); // Avatar opslaan in localStorage
                        } else {
                            console.error('Failed to fetch avatar');
                            setAvatar(defaultAvatar);
                        }
                    } catch (error) {
                        console.error('Error fetching avatar:', error);
                        setAvatar(defaultAvatar);
                    }
                }
            };
            fetchAvatar();
        }
    }, []);

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};