import { useState, useEffect } from 'react';
import axios from 'axios';
import PlusIcon from '../../src/assets/add-list.svg?react';
import EyeIcon from '../../src/assets/see-eye.svg?react';
import EyeSeen from '../../src/assets/eyes-seen.svg?react';
import Heart from '../../src/assets/heart.svg?react';
import './sliderSwiper.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../../src/provider/AuthenticationProvider/AuthenticationProvider.jsx';

export default function SliderSwiper(props) {
    const { username } = useAuthentication();
    const moviesMap = Array.isArray(props.data) ? props.data : [];

    // State to track favorite and seen movies
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [seenMovies, setSeenMovies] = useState([]);

    // Fetch the favorite and seen movies when the component mounts
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [favoriteMoviesResponse, seenMoviesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/users/${username}/favorite-movies`),
                    axios.get(`http://localhost:8080/users/${username}/seen-movies`)
                ]);

                if (favoriteMoviesResponse.status === 200) {
                    setFavoriteMovies(favoriteMoviesResponse.data.map(movie => movie.id));
                } else {
                    console.error(`Failed to retrieve favorite movies. Status: ${favoriteMoviesResponse.status}`);
                }

                if (seenMoviesResponse.status === 200) {
                    setSeenMovies(seenMoviesResponse.data.map(movie => movie.id));
                } else {
                    console.error(`Failed to retrieve seen movies. Status: ${seenMoviesResponse.status}`);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [username]);

    const toggleFavorite = async (movieId) => {
        try {
            if (favoriteMovies.includes(movieId)) {
                // Optimistically update UI
                setFavoriteMovies(favoriteMovies.filter(id => id !== movieId));

                const response = await axios.delete(`http://localhost:8080/users/${username}/favorite-movies`, {
                    data: [{ id: movieId }]
                });

                if (response.status !== 200) {
                    // Revert UI if the request fails
                    setFavoriteMovies([...favoriteMovies, movieId]);
                    console.error(`Failed to remove the movie from favorites. Status: ${response.status}`);
                }
            } else {
                // Optimistically update UI
                setFavoriteMovies([...favoriteMovies, movieId]);

                const response = await axios.post(`http://localhost:8080/users/${username}/favorite-movies`, [{ id: movieId }]);

                if (response.status !== 200) {
                    // Revert UI if the request fails
                    setFavoriteMovies(favoriteMovies.filter(id => id !== movieId));
                    console.error(`Failed to add the movie to favorites. Status: ${response.status}`);
                }
            }
        } catch (error) {
            console.error('Error toggling favorite status:', error);
            // Revert UI in case of an error
            setFavoriteMovies(favoriteMovies.includes(movieId) ? favoriteMovies.filter(id => id !== movieId) : [...favoriteMovies, movieId]);
        }
    };

    const toggleSeen = async (movieId) => {
        try {
            if (seenMovies.includes(movieId)) {
                // Optimistically update UI
                setSeenMovies(seenMovies.filter(id => id !== movieId));

                const response = await axios.delete(`http://localhost:8080/users/${username}/seen-movies`, {
                    data: [{ id: movieId }]
                });

                if (response.status !== 200) {
                    // Revert UI if the request fails
                    setSeenMovies([...seenMovies, movieId]);
                    console.error(`Failed to remove the movie from seen list. Status: ${response.status}`);
                }
            } else {
                // Optimistically update UI
                setSeenMovies([...seenMovies, movieId]);

                const response = await axios.post(`http://localhost:8080/users/${username}/seen-movies`, [{ id: movieId }]);

                if (response.status !== 200) {
                    // Revert UI if the request fails
                    setSeenMovies(seenMovies.filter(id => id !== movieId));
                    console.error(`Failed to add the movie to seen list. Status: ${response.status}`);
                }
            }
        } catch (error) {
            console.error('Error toggling seen status:', error);
            // Revert UI in case of an error
            setSeenMovies(seenMovies.includes(movieId) ? seenMovies.filter(id => id !== movieId) : [...seenMovies, movieId]);
        }
    };

    return (
        <>
            <Swiper
                navigation={true}
                slidesPerView={3}
                spaceBetween={120}
                modules={[Navigation]}
                breakpoints={{
                    768: {
                        slidesPerView: 6,
                        spaceBetween: -20
                    },
                }}
                className="mySwiper"
            >
                {moviesMap.map(({ title, releaseDate: release_date, imageUrl: poster_path, id }) => (
                    <SwiperSlide key={id}>
                        <Link to={`/movie/${id}`} className="movie-link">
                            <article className="movie-tiles">
                                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="movie" />
                                <div className="movie-description">
                                    <h1>{title}</h1>
                                    <h1>{(new Date(release_date)).getFullYear()}</h1>
                                    <p>Rating: <span>7.4</span></p>
                                </div>
                            </article>
                        </Link>
                        <div className="movie-add">
                            <span className="movie-heart" onClick={() => toggleFavorite(id)}>
                                <Heart fill={favoriteMovies.includes(id) ? "red" : "none"} />
                            </span>
                            <div className="movie-add--list">
                                <span className="movie--add">
                                    <PlusIcon />
                                </span>
                                <span className="movie--see" onClick={() => toggleSeen(id)}>
                                    {seenMovies.includes(id) ? <EyeSeen /> : <EyeIcon />}
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}