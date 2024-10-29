import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SliderSwiper from '../../helper/sliderSwiper.jsx';  // Import the Swiper component to display movies
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import './MovieRecommendations.css'; // Import CSS for styling

export default function MovieRecommendations({ currentMovieGenres }) {
    const { username } = useAuthentication();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    //Aanbevelingen op basis van genre (van film die bekeken wordt) + favorieten lijst
    useEffect(() => {
        console.log('Current Movie Genres:', currentMovieGenres);

        const fetchRecommendations = async () => {
            setLoading(true);
            setError('');
            try {
                const favoriteResponse = await axios.get(`http://localhost:8080/users/${username}/favorite-movies`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const favoriteMovies = favoriteResponse.data;

                const combinedGenres = new Set(currentMovieGenres);

                const allGenreMovies = [];

                for (const genre of combinedGenres) {
                    const genreResponse = await axios.get(`http://localhost:8080/movies-by-genre`, {
                        params: { genre },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                        }
                    });

                    if (genreResponse.data && genreResponse.data.length > 0) {
                        allGenreMovies.push(...genreResponse.data);
                    }
                }

                const combinedRecommendations = [...allGenreMovies, ...favoriteMovies];

                // Filter out duplicates based on movie ID
                const uniqueRecommendations = Array.from(new Set(combinedRecommendations.map(movie => movie.id)))
                    .map(id => combinedRecommendations.find(movie => movie.id === id));

                setRecommendations(uniqueRecommendations);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                setError('Er is een fout opgetreden bij het ophalen van aanbevelingen.');
            } finally {
                setLoading(false); //
            }
        };

        if (currentMovieGenres.length > 0) {
            fetchRecommendations();
        }
    }, [username, currentMovieGenres]);

    return (
        <div className="recommendation-section">
            <h2 className="recommendation-title">Films aanbevolen voor jou</h2>
            {loading ? (
                <p className="loading-text">Aanbevelingen laden...</p> // Loader message
            ) : error ? (
                <p className="error-text">{error}</p> // Display error message
            ) : recommendations.length > 0 ? (
                <div className="recommendation-content">
                    <SliderSwiper data={recommendations} uniqueKey="recommendation" />
                </div>
            ) : (
                <p className="loading-text">Geen aanbevelingen beschikbaar.</p>
            )}
        </div>
    );
}