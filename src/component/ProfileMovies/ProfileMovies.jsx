import React from 'react';

function ProfileMovies({ movie, removeFavoriteMovie, title, removeSeenMovie }) {
    const handleRemove = () => {
        if (removeSeenMovie) {
            removeSeenMovie(movie.id);
        } else {
            removeFavoriteMovie(movie.id);
        }
    };

    return (
        <li className="favorite-item">
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-details">
                <h3>{movie.title}</h3>
            </div>
            <button onClick={handleRemove}>Remove from {title}</button>
        </li>
    );
}

export default ProfileMovies;
