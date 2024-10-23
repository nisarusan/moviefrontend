import React, { useState } from 'react';
import PlusIcon from '../../assets/add-list.svg?react';
import EyeIcon from '../../assets/see-eye.svg?react';
import EyeSeen from '../../assets/eyes-seen.svg?react';
import HeartIcon from '../../assets/heart.svg?react';
import HeartRed from '../../assets/heart-click.svg?react';
import axios from 'axios';


function MovieActions({ movieId, username, showAsButton = true }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSeen, setIsSeen] = useState(false);

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await axios.delete(`http://localhost:8080/users/${username}/favorite-movies`, { data: [{ id: movieId }] });
            } else {
                await axios.post(`http://localhost:8080/users/${username}/favorite-movies`, [{ id: movieId }]);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const toggleSeen = async () => {
        try {
            if (isSeen) {
                await axios.delete(`http://localhost:8080/users/${username}/seen-movies`, { data: [{ id: movieId }] });
            } else {
                await axios.post(`http://localhost:8080/users/${username}/seen-movies`, [{ id: movieId }]);
            }
            setIsSeen(!isSeen);
        } catch (error) {
            console.error('Error toggling seen:', error);
        }
    };

    return (
        <div className="movie-personal--icns">
            <span className="movie-see" onClick={toggleSeen}>
                {isSeen ? <EyeSeen/> : <EyeIcon/>}
            </span>
            {!showAsButton ? (
                <span className="movie-heart" onClick={toggleFavorite}>
                    {isFavorite ? <HeartRed/> : <HeartIcon />}
                </span>
            ) : (
                <button type="button" className="movie-add-favorite" onClick={toggleFavorite}>
                    {isFavorite ? <HeartRed/> : <HeartIcon />}
                    <p>{isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}</p>
                </button>
            )}

        </div>
    );
}

export default MovieActions;