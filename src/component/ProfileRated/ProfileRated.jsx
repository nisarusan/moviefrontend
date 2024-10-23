import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileRated.css';
import { useAuthentication } from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";
import ProfileMovies from "../ProfileMovies/ProfileMovies.jsx"; //

function ProfileRated() {
    const [ratedMovies, setRatedMovies] = useState([]);
    const { username } = useAuthentication();

    useEffect(() => {
        const fetchRatedMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${username}/rated-movies`);
                console.log(response.data);
                if (response.status === 200) {
                    setRatedMovies(response.data);
                } else {
                    console.error(`Failed to retrieve rated Movies. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching rated movies:', error);
            }
        };

        if (username) {
            fetchRatedMovies();
        }
    }, [username]);


    return (
        <div className="profile-rated">
            <h2 className="profile-titles">Beoordeelde Films</h2>
            {ratedMovies.length > 0 ? (
                <div className="movies-list">
                    <ul className="movie-list">
                        {ratedMovies.map((movie, index) => (
                            <ProfileMovies key={index} movie={movie} title="rated" />
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No movies rated yet.</p>
            )}
        </div>
    );
}

export default ProfileRated;
