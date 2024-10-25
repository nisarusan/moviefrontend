import React, { useContext } from 'react';
import EyeIcon from '../../assets/see-eye.svg?react';
import EyeSeen from '../../assets/eyes-seen.svg?react';
import HeartIcon from '../../assets/heart.svg?react';
import HeartRed from '../../assets/heart-click.svg?react';
import { FavoritesContext } from '../../context/FavoriteContext.jsx';

function MovieActions({ movieId, showAsButton = true }) {
    const { favorites, seenMovies, toggleFavorite, toggleSeen, loading } = useContext(FavoritesContext);

    if (loading) return null; // Wacht totdat data is opgehaald

    const isFavorite = favorites.some(movie => movie.id === movieId);
    const isSeen = seenMovies.some(movie => movie.id === movieId);

    return (
        <div className="movie-personal--icns">
            <span className="movie-see" onClick={() => toggleSeen(movieId)}>
                {isSeen ? <EyeSeen /> : <EyeIcon />}
            </span>
            {!showAsButton ? (
                <span className="movie-heart" onClick={() => toggleFavorite(movieId)}>
                    {isFavorite ? <HeartRed /> : <HeartIcon />}
                </span>
            ) : (
                <button type="button" className="movie-add-favorite" onClick={() => toggleFavorite(movieId)}>
                    {isFavorite ? <HeartRed /> : <HeartIcon />}
                    <p>{isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}</p>
                </button>
            )}
        </div>
    );
}

export default MovieActions;