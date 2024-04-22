import React, {useState} from 'react';
import axios from 'axios';
import './SearchComp.css';
import { useMovieContext } from '../../context/MovieContext.jsx';

function SearchComp() {
    const { handleMovieSelection } = useMovieContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);


    const handleInputChange = async (event) => {
        const { value } = event.currentTarget;
        setSearchTerm(value);

        try {
            const response = await axios.get(`http://localhost:8080/movies?query=${value}`);
            const movies = response.data;

            const filteredResults = movies.filter((movie) =>
                movie.title.toLowerCase().includes(value.toLowerCase())
            );

            const limitedResults = filteredResults.slice(0, 8);
            setAutocompleteResults(limitedResults);

            setShowAutocomplete(value.trim().length > 0 && limitedResults.length > 0);
        } catch (error) {
            console.error('Error fetching autocomplete results:', error);
            setAutocompleteResults([]);
            setShowAutocomplete(false);
        }
    };

    const handleResultClick = (movieId) => {
        handleMovieSelection(movieId); // Update selected movie ID via context
        setSearchTerm('');
        setShowAutocomplete(false);
    };


    return (
        <div className="search-wrapper">
            <input
                type="search"
                name="search"
                title="search"
                aria-label="search"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={handleInputChange}
                className={`search-input ${showAutocomplete ? 'autocomplete-visible' : ''}`}
                autoComplete="off"
            />
            {showAutocomplete && autocompleteResults.length > 0 && (
                <div className="autocomplete-results">
                    <ul>
                        {autocompleteResults.map((movie) => (
                            <li
                                key={movie.id}
                                onClick={() => handleResultClick(movie.id)}
                                className="autocomplete-item"
                            >
                                {movie.imageUrl && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.imageUrl}`}
                                        alt={movie.title}
                                        className="autocomplete-image"
                                    />
                                )}
                                <span className="autocomplete-title">{movie.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchComp;
