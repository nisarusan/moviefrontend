import React from 'react';
import './ProfileMovies.css';
import {Link} from "react-router-dom";

function ProfileMovies({ movie, removeFavoriteMovie, title, removeSeenMovie, removeRatedMovie }) {
    const handleRemove = () => {
        if (removeRatedMovie) {
            removeRatedMovie(movie.id);
        } else if (removeSeenMovie) {
            removeSeenMovie(movie.id);
        } else if (removeFavoriteMovie) {
            removeFavoriteMovie(movie.id);
        } else {
            console.warn("Geen verwijderfunctie beschikbaar voor deze film.");
        }
    };

    return (
        <li className="movie-item">
            <Link to={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500/${movie.imageUrl}`} alt={movie.title} /></Link>
            <div className="movie-details">
                <Link to={`/movie/${movie.id}`}><h3>{movie.title}</h3></Link>
                <button type="button" onClick={handleRemove}>Verwijder uit {title}</button>
            </div>
        </li>
    );
}

export default ProfileMovies;