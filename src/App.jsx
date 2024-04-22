import React from 'react';
import HeaderMovie from "./component/HeaderMovie/HeaderMovie.jsx";
import FooterComponent from "./component/FooterComponent/FooterComponent.jsx";
import SearchComp from "./component/SearchComp/SearchComp.jsx";
import MovieDetailContainer from "./component/MovieDetailContainer/MovieDetailContainer.jsx";
import { MovieProvider } from "./context/MovieContext.jsx";
import SliderSwiper from "./helper/sliderSwiper.jsx";
import TilesCards from "./component/TilesCards/TilesCards.jsx";

function App() {
    return (
        <MovieProvider>
            <HeaderMovie />
            <SearchComp />
            <TilesCards />
            <MovieDetailContainer />
            <FooterComponent />
        </MovieProvider>
    );
}

export default App;
