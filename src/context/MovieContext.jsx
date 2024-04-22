// MovieContext.jsx

import React, { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const handleMovieSelection = (movieId) => {
        setSelectedMovieId(movieId);
    };

    return (
        <MovieContext.Provider value={{ selectedMovieId, handleMovieSelection }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => useContext(MovieContext);
