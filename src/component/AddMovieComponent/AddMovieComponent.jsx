import React, { useState } from 'react';
import './AddMovieComponent.css';
import axios from 'axios';

function AddMovieComponent() {
    const [movie, setMovie] = useState({
        title: '',
        imageUrl: '',
        director: '',
        releaseDate: '',
        genres: [],
        description: '',
        duration: 0,
        ratings: []
    });

    const [genreInput, setGenreInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleAddGenre = () => {
        if (genreInput.trim() && !movie.genres.includes(genreInput.trim())) {
            setMovie({ ...movie, genres: [...movie.genres, genreInput.trim()] });
            setGenreInput('');
        }
    };

    const handleRemoveGenre = (genre) => {
        setMovie({ ...movie, genres: movie.genres.filter(g => g !== genre) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movieData = {
            ...movie,
            imageUrl: `https://image.tmdb.org/t/p/w1280/${movie.imageUrl}`
        };

        try {
            const response = await axios.post('http://localhost:8080/movie', movieData);
            if (response.status === 200 || response.status === 201) {
                // Reset movie object
                setMovie({
                    title: '',
                    imageUrl: '',
                    director: '',
                    releaseDate: '',
                    genres: [],
                    description: '',
                    duration: 0,
                    ratings: []
                });
            } else {
                console.error('Failed to add movie');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="add-movie-container">
            <h2>Add a New Movie</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={movie.title} onChange={handleChange} maxLength="255" required />
                </div>
                <div className="form-group">
                    <label>Image URL (tmdb.org):</label>
                    <input type="text" name="imageUrl" value={movie.imageUrl} onChange={handleChange} maxLength="255" required />
                </div>
                <div className="form-group">
                    <label>Director:</label>
                    <input type="text" name="director" value={movie.director} onChange={handleChange} maxLength="255" required />
                </div>
                <div className="form-group">
                    <label>Release Date:</label>
                    <input type="date" name="releaseDate" value={movie.releaseDate} onChange={handleChange} required />
                </div>
                {/*<div className="form-group">*/}
                {/*    <label>Genres:</label>*/}
                {/*    <div className="genre-input-group">*/}
                {/*        <input type="text" value={genreInput} onChange={(e) => setGenreInput(e.target.value)} />*/}
                {/*        <button type="button" onClick={handleAddGenre}>Add Genre</button>*/}
                {/*    </div>*/}
                {/*    <div className="genre-list">*/}
                {/*        {movie.genres.map((genre, index) => (*/}
                {/*            <div key={index} className="genre-item">*/}
                {/*                {genre}*/}
                {/*                <button type="button" onClick={() => handleRemoveGenre(genre)}>Remove</button>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={movie.description} onChange={handleChange} maxLength="1000" required />
                </div>
                <div className="form-group">
                    <label>Duration (minutes):</label>
                    <input type="number" name="duration" value={movie.duration} onChange={handleChange} required />
                </div>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
}

export default AddMovieComponent;
