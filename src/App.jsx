import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderMovie from './component/HeaderMovie/HeaderMovie.jsx';
import FooterComponent from './component/FooterComponent/FooterComponent.jsx';
import SearchComp from './component/SearchComp/SearchComp.jsx';
import MovieDetailContainer from './component/MovieDetailContainer/MovieDetailContainer.jsx';
import { MovieProvider } from './context/MovieContext.jsx';
import TilesCards from './component/TilesCards/TilesCards.jsx';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    // Simulating a loading delay with useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading to false after 2 seconds (simulating content loading)
        }, 2000);

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <MovieProvider>
            <Router>
                <HeaderMovie />
                <SearchComp />
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <Routes>
                        <Route path="/" element={<TilesCards />} />
                        <Route path="/movies" element={<TilesCards />} />
                        <Route path="/movie/:id" element={<MovieDetailContainer />} />
                    </Routes>
                )}
                <FooterComponent />
            </Router>
        </MovieProvider>
    );
}

export default App;
