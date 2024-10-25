import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieActions from '../MovieActions/MovieActions.jsx'; // Assuming you have this component for actions
import './Movielist.css';
export default function MovieList() {
    const [movies, setMovies] = useState([]);

    // Fetch movies from an API when the component mounts
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get('http://localhost:8080/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div className="movie-lijst">
            {movies.map(({ title, releaseDate: release_date, imageUrl: poster_path, id }) => (
                <div key={id} className="movie-item">
                    <Link to={`/movie/${id}`} className="movie-link">
                        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
                        <div className="movie-description">
                            <h1>{title}</h1>
                            <h1>{release_date ? release_date.substring(0, 4) : 'N/A'}</h1>
                        </div>
                    </Link>
                    <MovieActions movieId={id} showAsButton={false} />
                </div>
            ))}
        </div>
    );
}