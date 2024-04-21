import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import HeaderMovie from "./component/HeaderMovie/HeaderMovie.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import FooterComponent from "./component/FooterComponent/FooterComponent.jsx";
import ErrorComponent from "./component/ErrorComponent/ErrorComponent.jsx";
import SearchComp from "./component/SearchComp/SearchComp.jsx";
import TilesCards from "./component/TilesCards/TilesCards.jsx";
import MovieDetail from "./component/MovieDetail/MovieDetail.jsx";
import Movie from "./pages/Movie/Movie.jsx";

function App() {
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const handleMovieSelection = (movieId) => {
        setSelectedMovieId(movieId);
    };
  return (
    <>
        <HeaderMovie />
        {/*<HomePage />*/}
        <SearchComp onMovieSelect={handleMovieSelection}/>
        {selectedMovieId && <Movie movieid={selectedMovieId} />}
        {/*<TilesCards />*/}
        {/*<ErrorComponent />*/}
        <FooterComponent />
    </>
  )
}

export default App;
