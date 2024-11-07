import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileRated.css';
import { useAuthentication } from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";
import ProfileMovies from "../ProfileMovies/ProfileMovies.jsx";

function ProfileRated() {
    const [ratedMovies, setRatedMovies] = useState([]);
    const { username } = useAuthentication();

    useEffect(() => {
        const fetchRatedMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${username}/rated-movies`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                console.log("JWT Token:", localStorage.getItem('jwtToken'));
                if (response.status === 200) {
                    setRatedMovies(response.data);
                } else {
                    console.error(`Failed to retrieve rated movies. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching rated movies:', error);
            }
        };

        if (username) {
            fetchRatedMovies();
        }
    }, [username]);

    const removeRatedMovie = async (movieId) => {
        try { // not sure why not accepting in postman works.. back-end seems correct configured
            const response = await axios.delete(`http://localhost:8080/${username}/has-rated/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            if (response.status === 200) {
                setRatedMovies(prevRatedMovies => prevRatedMovies.filter(movie => movie.id !== movieId));
            } else {
                console.error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error removing movie from rated list:', error);
        }
    };

    return (
        <div className="profile-rated">
            <h2 className="profile-titles">Beoordeelde Films</h2>
            {ratedMovies.length > 0 ? (
                <div className="movies-list">
                    <ul className="movie-list">
                        {ratedMovies.map((movie, index) => (
                            <ProfileMovies
                                key={index}
                                movie={movie}
                                title="rated"
                                removeRatedMovie={removeRatedMovie}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Geen films beoordeeld</p>
            )}
        </div>
    );
}

export default ProfileRated;