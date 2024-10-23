// ProfileFavorite.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileFavorite.css';
import { useAuthentication } from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";
import MovieDetail from '../../component/MovieDetail/MovieDetail.jsx';
import FavoriteMovie from "../ProfileMovies/ProfileMovies.jsx";
import ProfileMovies from "../ProfileMovies/ProfileMovies.jsx";

function ProfileFavorite() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const { username } = useAuthentication();

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${username}/favorite-movies`);
                if (response.status === 200) {
                    console.log(response.data);
                    setFavoriteMovies(response.data);
                } else {
                    console.error(`Failed to retrieve favorite movies. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching favorite movies:', error);
            }
        };

        if (username) {
            fetchFavoriteMovies();
        }
    }, [username]);

    const removeFavoriteMovie = async (movieId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/users/${username}/favorite-movies`, {
                data: [{ id: movieId }]
            });
            if (response.status === 200) {
                console.log('Film is verwijderd uit favorieten!');
                setFavoriteMovies(prevFavoriteMovies => prevFavoriteMovies.filter(movie => movie.id !== movieId));
            } else {
                console.error(`Failed to remove movie from favorites. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error removing movie from favorites:', error);
        }
    };

    return (
        <div className="profile-favorite">
            <h2 className="profile-titles">Favorite Movies</h2>
            {favoriteMovies.length > 0 ? (
                <div className="movies-list">
                    <ul className="movie-list">
                        {favoriteMovies.map((movie, index) => (
                            <ProfileMovies key={index} movie={movie} removeFavoriteMovie={removeFavoriteMovie} title="Favorieten" />
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Geen favoriete films</p>
            )}
        </div>
    );
}

export default ProfileFavorite;
