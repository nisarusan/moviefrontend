import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileSeen.css';
import { useAuthentication } from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";
import MovieDetail from '../../component/MovieDetail/MovieDetail.jsx'; // Assuming MovieDetail component is in a separate file
import ProfileMovies from "../ProfileMovies/ProfileMovies.jsx"; //

function ProfileSeen() {
    const [seenMovies, setSeenMovies] = useState([]);
    const { username } = useAuthentication();

    useEffect(() => {
        const fetchSeenMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${username}/seen-movies`);
                if (response.status === 200) {
                    setSeenMovies(response.data);
                } else {
                    console.error(`Failed to retrieve seen movies. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching seen movies:', error);
            }
        };

        if (username) {
            fetchSeenMovies();
        }
    }, [username]);

    const removeSeenMovies = async (movieId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/users/${username}/seen-movies`, {
                data: [{ id: movieId }]
            });
            if (response.status === 200) {
                console.log('Film is verwijderd uit gezien lijst!');
                setSeenMovies(prevSeenMovies => prevSeenMovies.filter(movie => movie.id !== movieId));
            } else {
                console.error(`Failed to remove movie from seen list. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error removing movie from seen list:', error);
        }
    };
    return (
        <div className="profile-seen">
            <h2 className="profile-titles">Seen Movies</h2>
            {seenMovies.length > 0 ? (
                <div className="movies-list">
                    <ul className="movie-list">
                        {seenMovies.map((movie, index) => (
                            <ProfileMovies key={index} movie={movie} removeSeenMovie={removeSeenMovies} title="Seen" />
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No Seen movies yet.</p>
            )}
        </div>
    );
}

export default ProfileSeen;
