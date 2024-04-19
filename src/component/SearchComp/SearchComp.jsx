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
        const { value } = event.target;
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

    const handleClickOutside = (event) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target) &&
            autocompleteRef.current &&
            !autocompleteRef.current.contains(event.target)
        ) {
            // Click occurred outside of both the input field and the autocomplete container
            setShowAutocomplete(false);
            setSearchTerm(''); // Reset the input value to empty string
        }
    };

    useEffect(() => {
        // Attach event listener to handle clicks outside of the input field and autocomplete container
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Cleanup: remove event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <div className="search-wrapper">
            <form className="search">
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
            </form>
            {showAutocomplete && autocompleteResults.length > 0 && (
                <div ref={autocompleteRef} className="autocomplete-results">
                    <ul>
                        {autocompleteResults.map((movie) => (
                            <li key={movie.id} onClick={() => console.log(movie)}>
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
