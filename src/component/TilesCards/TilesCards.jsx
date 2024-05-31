import './TilesCards.css';
import Movie1 from '../../assets/movie-1.png';
import {useEffect, useRef, useState} from "react";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import slides from '../../constant/mock.json';

// Import Swiper styles
import 'swiper/css';
import SliderSwiper from "../../helper/sliderSwiper.jsx";
function TilesCards() {

    const [movies, setMovies] = useState([]);


    //UseEffect zodat het 1x laad
    // Voorheen hele back-end van java werd tientallen x geladen
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get('http://localhost:8080/movies');
                setMovies(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMovies();
    }, []);




        return (
            <>
                <section className="movie">
                    <h1 className="movie-title">Trending films</h1>
                    {/*<div className="movie-grid--group">*/}
                <SliderSwiper data={movies} />
                <SliderSwiper data={movies} />
                </section>
            </>
        )
            ;
}
export default TilesCards;