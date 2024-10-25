import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SliderSwiper from '../../helper/sliderSwiper.jsx';  // Import the Swiper component to display movies
import {useAuthentication} from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import './MovieRecommendations.css'; // Import CSS for styling

export default function MovieRecommendations({currentMovieGenres}) {
    const {username} = useAuthentication();  // Get the username from context
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                // Fetch user's favorite movies
                const favoriteResponse = await axios.get(`http://localhost:8080/users/${username}/favorite-movies`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const favoriteMovies = favoriteResponse.data;

                // Voeg de genres van de favoriete en huidige film samen
                const combinedGenres = new Set(currentMovieGenres);
                if (favoriteMovies.length > 0) {
                    favoriteMovies.forEach(movie => {
                        movie.genres.forEach(genre => combinedGenres.add(genre.name));
                    });
                }

                // Zet genres om naar een string voor de query
                const genreList = Array.from(combinedGenres).join(',');

                if (genreList) {
                    // Fetch movies based on combined genres
                    const genreResponse = await axios.get(`http://localhost:8080/movies-by-genre`, {
                        params: {genre: genreList},
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                        }
                    });
                    const genreMovies = genreResponse.data;

                    // Filter out already favorited movies
                    const genreBasedRecommendations = genreMovies.filter(
                        movie => !favoriteMovies.some(favMovie => favMovie.id === movie.id)
                    );

                    // Combine both favorite movies and genre-based recommendations
                    const combinedRecommendations = [...favoriteMovies, ...genreBasedRecommendations];

                    setRecommendations(combinedRecommendations);  // Set the final recommendations
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [username, currentMovieGenres]);

    return (
        <div className="recommendation-section">
            <h2 className="recommendation-title">Films aanbevolen voor jou</h2>
            {recommendations.length > 0 ? (
                <div className="recommendation-content">
                    <SliderSwiper data={recommendations} uniqueKey="recommendation"/>
                </div>
            ) : (
                <p className="loading-text">Geen aanbeveling..</p>
            )}
        </div>
    );
}