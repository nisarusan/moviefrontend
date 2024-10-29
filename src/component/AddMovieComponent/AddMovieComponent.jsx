import React, { useState, useEffect } from 'react';
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
        ratings: [] // Of hier een default waarde zoals null of [] afhankelijk van je backend
    });

    const [genreInput, setGenreInput] = useState('');
    const [genresList, setGenresList] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState(''); // State voor feedback
    const [feedbackType, setFeedbackType] = useState(''); // Voor het type feedback
    const token = localStorage.getItem('jwtToken');

    // Functie om genres op te halen
    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:8080/genres', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setGenresList(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
            setFeedbackMessage('Error fetching genres'); // Geef feedback bij een fout
            setFeedbackType('error');
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleAddGenre = () => {
        if (genreInput.trim() && !movie.genres.some(g => g.name === genreInput.trim())) {
            setMovie({ ...movie, genres: [...movie.genres, { name: genreInput.trim() }] });
            setGenreInput('');
        }
    };

    const handleRemoveGenre = (genre) => {
        setMovie({ ...movie, genres: movie.genres.filter(g => g.name !== genre.name) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validatie van het formulier
        if (!movie.title || !movie.imageUrl || !movie.director || !movie.releaseDate || !movie.description || !movie.duration || movie.genres.length === 0) {
            setFeedbackMessage('Vul alstublieft alle velden in.');
            setFeedbackType('error');
            return; // Stop met verzenden als er velden ontbreken
        }

        const movieData = {
            ...movie,
            imageUrl: `https://image.tmdb.org/t/p/w1280/${movie.imageUrl}`
        };

        try {
            const response = await axios.post('http://localhost:8080/movie', movieData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200 || response.status === 201) {
                setFeedbackMessage('Film succesvol toegevoegd!'); // Succes feedback
                setFeedbackType('success');
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
                setFeedbackMessage('Failed to add movie'); // Fout feedback
                setFeedbackType('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setFeedbackMessage('Er is een fout opgetreden bij het toevoegen van de film.'); // Geef foutfeedback
            setFeedbackType('error');
        }
    };

    return (
        <div className="add-movie-container">
            <h2>Voeg een nieuwe film toe</h2>
            {feedbackMessage && (
                <div className={`feedback-message ${feedbackType}`}>
                    {feedbackMessage}
                </div>
            )} {/* Feedback weergeven */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titel:</label>
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
                <div className="form-group">
                    <label>Genres:</label>
                    <select value={genreInput} onChange={(e) => setGenreInput(e.target.value)}>
                        <option value="">Selecteer een genre</option>
                        {genresList.map((genre, index) => (
                            <option key={index} value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                    <button type="button" onClick={handleAddGenre} disabled={!genreInput}>Voeg Genre Toe</button>
                </div>
                <div className="genre-list">
                    {movie.genres.map((genre, index) => (
                        <div key={index} className="genre-item">
                            {genre.name}
                            <button type="button" onClick={() => handleRemoveGenre(genre)}>Verwijder</button>
                        </div>
                    ))}
                </div>
                <div className="form-group">
                    <label>Beschrijving:</label>
                    <textarea name="description" value={movie.description} onChange={handleChange} maxLength="1000" required />
                </div>
                <div className="form-group">
                    <label>Duur (minuten):</label>
                    <input type="number" name="duration" value={movie.duration} onChange={handleChange} required />
                </div>
                <button type="submit">Voeg Film Toe</button>
            </form>
        </div>
    );
}

export default AddMovieComponent;