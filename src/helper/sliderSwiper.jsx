import {useEffect, useRef, useState} from 'react';
import Movie1 from '../../src/assets/movie-1.png';
import PlusIcon from '../../src/assets/add-list.svg?react';
import EyeIcon from '../../src/assets/see-eye.svg?react';
import EyeSeen from '../../src/assets/eyes-seen.svg?react';
import Heart from '../../src/assets/heart.svg?react';
import './sliderSwiper.css';

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import {Navigation} from 'swiper/modules';
import {Link} from 'react-router-dom';
import axios from "axios";
import MovieActions from "../component/MovieActions/MovieActions.jsx";
import {useAuthentication} from "../provider/AuthenticationProvider/AuthenticationProvider.jsx"; // Import Link from react-router-dom

export default function SliderSwiper(props, {uniqueKey}) {
    const {username} = useAuthentication(); // nodig om juiste username te krijgen en films in favorieten te kunnen toevoegen
    const [ratings, setRatings] = useState({});

    const fetchAverageRating = async (movieId) => {
        try {
            const response = await axios.get(`http://localhost:8080/movie/${movieId}/average-rating`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            if (response.status === 200) {
                setRatings(prevRatings => ({...prevRatings, [movieId]: response.data}));
            }
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    };

    //functie om de sterren te renderen, style in react gelijk gebruiken. Style in module noemen ze dat..
    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Math.round(rating); // Round to nearest whole number
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            if (i <= filledStars) {
                stars.push(<span key={i} style={{color: '#FFD700'}}>&#9733;</span>); // Filled star (★)
            } else {
                stars.push(<span key={i}>&#9734;</span>); // Empty star (☆)
            }
        }

        return stars;
    };

    useEffect(() => {
        props.data.forEach(({id}) => {
            fetchAverageRating(id);
        });
    }, [props.data]);

    const moviesMap = Array.isArray(props.data) ? props.data : [];
    return (
        <>
            <Swiper navigation={true} slidesPerView={3} spaceBetween={120} modules={[Navigation]} breakpoints={{

                768: {
                    slidesPerView: 6,
                    spaceBetween: 20
                },
            }} className={`mySwiper-${uniqueKey}`}
            >
                {moviesMap.map(({title, releaseDate: release_date, imageUrl: poster_path, id}, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/movie/${id}`} className="movie-link">
                            <article className="movie-tiles">
                                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="movie"/>
                                <div className="movie-description">
                                    <h1>{title}</h1>
                                    <h1>{release_date ? release_date.substring(0, 4) : 'N/A'}</h1>
<<<<<<< HEAD
                                    <p>Rating: <span>Hier moet nog iets komen</span></p>
=======
                                    {ratings[id] > 0 && (
                                        <div className="rating-stars">
                                            {renderStars(ratings[id])}
                                        </div>
                                    )}
>>>>>>> dev
                                </div>
                            </article>
                        </Link>
                        <MovieActions movieId={id} username={username} showAsButton={false}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
