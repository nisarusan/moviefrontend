import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import './Rating.css';

function Rating({ movieId }) {
    const { username } = useAuthentication();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isRated, setIsRated] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        fetchAverageRating();
        checkIfUserRated();
    }, [movieId, username]);

    const fetchAverageRating = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/movie/${movieId}/average-rating`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            if (response.status === 200) {
                setAverageRating(response.data);
            } else {
                console.error('Failed to fetch average rating.');
            }
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    };

    const checkIfUserRated = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/${username}/rated-movies`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            if (response.status === 200) {
                const ratedMovies = response.data;
                const userHasRated = ratedMovies.some(movie => movie.id === movieId);

                if (userHasRated) {
                    setIsRated(true);
                    const userRating = ratedMovies.find(movie => movie.id === movieId).userRating;
                    setRating(userRating);
                }
            }
        } catch (error) {
            console.error('Error checking if user rated:', error);
        }
    };

    const handleRating = async (selectedRating) => {
        if (isRated) return;

        setRating(selectedRating);

        try {
            const response = await axios.post(
                `http://localhost:8080/${username}/rate-movie/${movieId}?rating=${selectedRating}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                }
            );
            if (response.status === 200) {
                setIsRated(true);
                setIsConfirmed(true);
                fetchAverageRating();
            } else {
                console.error('Failed to submit rating.');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    const renderStars = () => {
        return (
            <div className="stars-container">
                {[...Array(5)].map((_, i) => {
                    const isFullStar = i + 1 <= Math.round(averageRating); // Volledig gekleurde sterren afgerond op het dichtstbijzijnde geheel getal

                    return (
                        <span
                            key={i + 1}
                            className={`star ${hoverRating >= i + 1 ? 'hover' : ''} ${rating >= i + 1 ? 'selected' : ''}`}
                            onClick={() => handleRating(i + 1)}
                            onMouseEnter={() => setHoverRating(i + 1)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{
                                cursor: 'pointer',
                                color: isFullStar ? 'yellow' : 'gray'
                            }}
                        >
                        &#9733;
                    </span>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="rating-container">
            <p className="rating-container--sterren">Gemiddelde Rating: {averageRating.toFixed(1)} {renderStars()} </p>
        </div>
    );
}

export default Rating;