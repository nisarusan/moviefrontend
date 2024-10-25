import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Rating from "../Rating/Rating.jsx";
import MovieActions from "../MovieActions/MovieActions.jsx";
import './MovieDetail.css';
import MovieRecommendations from "../MovieRecommendations/MovieRecommendations.jsx";

function MovieDetail({movieId}) {
    const [movie, setMovie] = useState(null);
    const token = localStorage.getItem('jwtToken');
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/movie/${movieId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setMovie(response.data);
                } else {
                    console.error('Failed to retrieve movie details.');
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    const getReleaseYear = (releaseDate) => {
        return new Date(releaseDate).getFullYear();
    };

    return (
        <>
            <div className="movie-detail">
                {movie ? (
                    <>
                        <div className="movie-img">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.imageUrl}`} alt={movie.title}/>
                        </div>
                        <div className="movie-info">
                            <h1 className="movie-info-title">{movie.title}</h1>
                            <p className="movie-info-slogan">{movie.slogan}</p>
                            <p className="movie-rating">Rating: {movie.rating}</p>
                            <Rating movieId={movieId}/>
                            <div className="movie-meta">
                                <p>Director: {movie.director}</p>
                                <p>Release Date: {getReleaseYear(movie.releaseDate)}</p>
                            </div>
                            <h2 className="movie-genre">Genres</h2>
                            <ul className="movie-genre--list">
                                {movie.genres.map((genre, index) => (
                                    <li key={index} className="movie-genre--title">{genre.name}</li>
                                ))}
                            </ul>
                            <h3 className="movie-description">Beschrijving</h3>
                            <p className="movie-description--text">{movie.description}</p>
                            <div className="movie-personal">
                                <MovieActions movieId={movie.id}/>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Film laden...</p>
                )}
            </div>
            {movie && (
                <MovieRecommendations
                    currentMovieGenres={movie.genres.map(genre => genre.name)}
                    currentMovieId={movie.id}
                />
            )}
        </>
    );
}

export default MovieDetail;