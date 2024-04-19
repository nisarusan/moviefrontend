import React, { useState, useRef, useEffect } from 'react';
import './SearchComp.css';
import axios from 'axios';

function AutocompleteSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);

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

    const handleResultClick = (movie) => {
        console.log('Selected movie:', movie);
        setShowAutocomplete(false);
        setSearchTerm('');
    };

    const handleClickOutside = (event) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target) &&
            autocompleteRef.current &&
            !autocompleteRef.current.contains(event.target)
        ) {
            setSearchTerm('');
            setShowAutocomplete(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="search-wrapper">
            <input
                type="search"
                name="search"
                title="search"
                aria-label="search"
                placeholder="Welke film bent u op zoek?"
                value={searchTerm}
                onChange={handleInputChange}
                ref={inputRef}
                className={`search-input ${showAutocomplete ? 'autocomplete-visible' : ''}`}
                autoComplete="off"
            />
            {searchTerm && (
                <span
                    className="search-clear"
                    onClick={() => setSearchTerm('')}
                    title="Clear search"
                >
                    &times;
                </span>
            )}
            {showAutocomplete && autocompleteResults.length > 0 && (
                <div ref={autocompleteRef} className="autocomplete-results">
                    <ul>
                        {autocompleteResults.map((movie) => (
                            <li
                                key={movie.id}
                                onClick={() => handleResultClick(movie)}
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

export default AutocompleteSearch;
