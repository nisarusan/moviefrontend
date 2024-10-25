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

    useEffect(() => {
        fetchAverageRating();
        checkIfUserRated();
    }, []);

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
            const response = await axios.get(`http://localhost:8080/${username}/has-rated/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            if (response.status === 200 && response.data.rated) {
                setIsRated(true);
                setRating(response.data.rating); // stel de gegeven beoordeling van de gebruiker in
            }
        } catch (error) {
            console.error('Error checking if user rated:', error);
        }
    };

    const handleRating = async (selectedRating) => {
        if (isRated) return;

        setRating(selectedRating);

        try {
            const response = await axios.post(`http://localhost:8080/${username}/rate-movie/${movieId}?rating=${selectedRating}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            if (response.status === 200) {
                setIsRated(true);
                fetchAverageRating();
            } else {
                console.error('Failed to submit rating.');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    const renderStars = () => {
        if (isRated) {
            // Niet-interactieve sterren als de gebruiker al heeft beoordeeld
            return (
                <div className="stars-container">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i + 1}
                            className={`star ${i + 1 <= rating ? 'selected' : ''}`}
                            style={{ cursor: 'default' }}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
            );
        }

        // Interactieve sterren als de gebruiker nog niet heeft beoordeeld
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${hoverRating >= i ? 'hover' : ''} ${rating >= i ? 'selected' : ''} ${i <= averageRating ? 'average' : ''}`}
                    onClick={() => handleRating(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{ cursor: 'pointer' }}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="rating-container">
            <h2>Beoordeel deze film:</h2>
            <div className="stars-container">
                {renderStars()}
            </div>
            <p>Gemiddelde Rating: {averageRating.toFixed(1)}</p>
            {isRated && <p>Je hebt deze film al beoordeeld.</p>}
        </div>
    );
}

export default Rating;