import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {useAuthentication} from '../provider/AuthenticationProvider/AuthenticationProvider.jsx';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({children}) => {
    const {username} = useAuthentication();
    const [favorites, setFavorites] = useState([]);
    const [seenMovies, setSeenMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('jwtToken'); // kon hier useContext van maken.. misschien ander keer of zo is al goed..

    useEffect(() => {
        const fetchFavoritesAndSeen = async () => {
            const token = localStorage.getItem('jwtToken');
            try {
                const [favoriteResponse, seenResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/users/${username}/favorite-movies`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),
                    axios.get(`http://localhost:8080/users/${username}/seen-movies`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                ]);

                setFavorites(favoriteResponse.data);
                setSeenMovies(seenResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchFavoritesAndSeen();
        }
    }, [username]);

    const toggleFavorite = async (movieId) => {
        try {
            const isFavorite = favorites.some(movie => movie.id === movieId);
            if (isFavorite) {
                await axios.delete(`http://localhost:8080/users/${username}/favorite-movies`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: [{id: movieId}]
                });
                setFavorites(favorites.filter(movie => movie.id !== movieId));
            } else {
                await axios.post(`http://localhost:8080/users/${username}/favorite-movies`,  [{id: movieId}], {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFavorites([...favorites, {id: movieId}]);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const toggleSeen = async (movieId) => {
        try {
            const isSeen = seenMovies.some(movie => movie.id === movieId);
            if (isSeen) {
                await axios.delete(`http://localhost:8080/users/${username}/seen-movies`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: [{ id: movieId }]
                });
                setSeenMovies(seenMovies.filter(movie => movie.id !== movieId));
            } else {
                await axios.post(`http://localhost:8080/users/${username}/seen-movies`, [{id: movieId}], {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSeenMovies([...seenMovies, {id: movieId}]);
            }
        } catch (error) {
            console.error('Error toggling seen:', error);
        }
    };

    return (
        <FavoritesContext.Provider value={{favorites, seenMovies, toggleFavorite, toggleSeen, loading}}>
            {children}
        </FavoritesContext.Provider>
    );
};