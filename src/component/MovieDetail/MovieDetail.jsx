import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlusIcon from '../../assets/add-list.svg?react';
import EyeIcon from '../../assets/see-eye.svg?react';
import './MovieDetail.css';

function MovieDetail({ movieId }) {
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/movie/${movieId}`);
                if (response.status === 200) {
                    setMovie(response.data); // Update state with retrieved movie data
                } else {
                    console.error(`Failed to retrieve movie details. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        const fetchAverageRating = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/movie/${movieId}/average-rating`);
                if (response.status === 200) {
                    setRating(response.data);
                } else {
                    console.error(`Failed to retrieve rating details. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching rating details:', error);
            }
        };

        if (movieId) {
            fetchMovieDetail();
            fetchAverageRating();
        }
    }, [movieId]);

    const getReleaseYear = (releaseDate) => {
        return new Date(releaseDate).getFullYear();
    };

    return (
        <div className="movie-detail">
            {movie ? (
                <>
                    <div className="movie-img">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.imageUrl}`} alt={movie.title} />
                    </div>
                    <div className="movie-info">
                        <h1 className="movie-info-title">{movie.title}</h1>
                        <p className="movie-info-slogan">{movie.slogan}</p>
                        <p className="movie-rating">Rating: {rating}</p>
                        <div className="movie-meta">
                            <p>Director: {movie.director}</p>
                            <p>Release Date: {getReleaseYear(movie.releaseDate)}</p>
                        </div>
                        <h2 className="movie-genre">Genres</h2>
                        <ul className="movie-genre--list">
                            {movie.genres.map((genre, index) => (
                                <li key={index} className="movie-genre--title">{genre}</li>
                            ))}
                        </ul>
                        <h3 className="movie-description">Description</h3>
                        <p className="movie-description--text">{movie.description}</p>
                        <div className="movie-personal">
                            <div className="movie-personal--icns">
                                <span className="movie-plus">
                                    <PlusIcon />
                                </span>
                                <span className="movie-see">
                                    <EyeIcon />
                                </span>
                            </div>
                            <button className="movie-add-favorite">
                                <span className="movie-heart"></span>
                                Voeg toe aan favorieten
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading movie details...</p>
            )}
        </div>
    );
}

export default MovieDetail;
