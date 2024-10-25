import './TilesCards.css';
import { useEffect, useState } from "react";
import axios from "axios";
import SliderSwiper from "../../helper/sliderSwiper.jsx";
import MovieList from "../MovieList/Movielist.jsx";

function TilesCards() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [ratings, setRatings] = useState({}); // Store average ratings here
    const [filters, setFilters] = useState({
        genre: '',
        duration: 0,
        rating: 0,
        newest: true
    });

    // Fetch all movies once on component load
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get('http://localhost:8080/movies');
                setMovies(response.data);
                setFilteredMovies(response.data); // Set initial movies
                // Fetch average ratings for each movie
                response.data.forEach(movie => fetchAverageRating(movie.id));
            } catch (error) {
                console.error(error);
            }
        }
        fetchMovies();
    }, []);

    // Function to fetch the average rating for a movie
    const fetchAverageRating = async (movieId) => {
        try {
            const response = await axios.get(`http://localhost:8080/movie/${movieId}/average-rating`);
            if (response.status === 200) {
                setRatings(prevRatings => ({ ...prevRatings, [movieId]: response.data }));
            }
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    };

    // Handle filtering whenever filters change
    useEffect(() => {
        let filtered = movies;

        // Filter by genre
        if (filters.genre) {
            filtered = filtered.filter(movie => movie.genres.some(genre => genre.name === filters.genre));
        }

        // Filter by duration
        if (filters.duration > 0) {
            filtered = filtered.filter(movie => movie.duration <= filters.duration);
        }

        // Filter by rating using fetched ratings
        if (filters.rating > 0) {
            filtered = filtered.filter(movie => {
                const avgRating = ratings[movie.id] || 0; // Use the fetched rating
                return avgRating >= parseFloat(filters.rating);
            });
        }

        // Sort by release date (newest first)
        if (filters.newest) {
            filtered = filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        }

        setFilteredMovies(filtered);
    }, [filters, movies, ratings]);

    // Handle changes in filter inputs
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <section className="movie">
                <h1 className="movie-title">Trending films</h1>

                {/* Filter inputs */}
                <div className="filters">
                    <select name="genre" onChange={handleFilterChange}>
                        <option value="">All Genres</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Animation">Animation</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Drama">Drama</option>
                        <option value="Family">Family</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="History">History</option>
                        <option value="Horror">Horror</option>
                        <option value="Music">Music</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="TV Movie">TV Movie</option>
                        <option value="Thriller">Thriller</option>
                        <option value="War">War</option>
                        <option value="Western">Western</option>
                        {/* Add more genres */}
                    </select>

                    <input
                        type="number"
                        name="duration"
                        placeholder="Max Duration (minutes)"
                        onChange={handleFilterChange}
                    />

                    <input
                        type="number"
                        name="rating"
                        placeholder="Minimum Rating"
                        step="0.1"
                        onChange={handleFilterChange}
                    />

                    <label>
                        <input
                            type="checkbox"
                            name="newest"
                            onChange={() => setFilters(prev => ({...prev, newest: !prev.newest}))}
                        />
                        Newest First
                    </label>
                </div>

                <SliderSwiper data={filteredMovies} />
                <MovieList data={filteredMovies} />

            </section>
        </>
    );
}

export default TilesCards;