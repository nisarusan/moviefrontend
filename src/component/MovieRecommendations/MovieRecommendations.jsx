import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SliderSwiper from '../../helper/sliderSwiper.jsx';  // Import the Swiper component to display movies
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';

export default function MovieRecommendations() {
    const { username } = useAuthentication();  // Get the username from context
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                // Fetch user's favorite movies
                const favoriteResponse = await axios.get(`http://localhost:8080/users/${username}/favorite-movies`);
                const favoriteMovies = favoriteResponse.data;

                // Extract genres from favorite movies
                const favoriteGenres = new Set();
                favoriteMovies.forEach(movie => {
                    movie.genres.forEach(genre => favoriteGenres.add(genre.name));
                });

                // Fetch movies based on favorite genres
                const genreList = Array.from(favoriteGenres).join(',');
                const genreResponse = await axios.get(`http://localhost:8080/movies-by-genre`, {
                    params: { genre: genreList }
                });
                const genreMovies = genreResponse.data;

                // Filter out already favorited movies from genre-based results
                const genreBasedRecommendations = genreMovies.filter(
                    movie => !favoriteMovies.some(favMovie => favMovie.id === movie.id)
                );

                // Combine both favorite movies and genre-based recommendations
                const combinedRecommendations = [...favoriteMovies, ...genreBasedRecommendations];

                setRecommendations(combinedRecommendations);  // Set the final recommendations
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [username]);

    return (
        <div>
            <h2>Recommended Movies for You</h2>
            {recommendations.length > 0 ? (
                <SliderSwiper data={recommendations} uniqueKey="recommendation" />
            ) : (
                <p>Loading recommendations...</p>
            )}
        </div>
    );
}