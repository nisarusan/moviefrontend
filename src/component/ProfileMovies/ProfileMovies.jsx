import React from 'react';
import './ProfileMovies.css';
import {Link} from "react-router-dom";

function ProfileMovies({ movie, removeFavoriteMovie, title, removeSeenMovie }) {
    const handleRemove = () => {
        if (removeSeenMovie) {
            removeSeenMovie(movie.id);
        } else {
            removeFavoriteMovie(movie.id);
        }
    };

    return (
        <li className="movie-item">
            <Link to={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500/${movie.imageUrl}`} alt={movie.title} /></Link>
            <div className="movie-details">
                <Link to={`/movie/${movie.id}`}><h3>{movie.title}</h3></Link>
                <button onClick={handleRemove}>Verwijder uit {title}</button>
            </div>
        </li>
    );
}

export default ProfileMovies;
