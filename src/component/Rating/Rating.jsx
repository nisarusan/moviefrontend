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
    }, []);

    const fetchAverageRating = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/movie/${movieId}/average-rating`);
            if (response.status === 200) {
                setAverageRating(response.data);
            } else {
                console.error('Failed to fetch average rating.');
            }
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    };

    const handleRating = async (selectedRating) => {
        if (isRated) return;

        setRating(selectedRating);

        try {
            const response = await axios.post(`http://localhost:8080/${username}/rate-movie/${movieId}?rating=${selectedRating}`);
            if (response.status === 200) {
                setIsRated(true);
                console.log('Rating submitted successfully.');
                fetchAverageRating();
            } else {
                console.error('Failed to submit rating.');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${hoverRating >= i ? 'hover' : ''} ${rating >= i ? 'selected' : ''} ${i <= averageRating ? 'average' : ''}`}
                    onClick={() => handleRating(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={isRated}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="rating-container">
            <h2>Rate this movie:</h2>
            <div className="stars-container">
                {renderStars()}
            </div>
            <p>Average Rating: {averageRating.toFixed(1)}</p>
        </div>
    );
}

export default Rating;
