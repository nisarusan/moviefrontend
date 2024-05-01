import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PlusIcon from '../../assets/add-list.svg?react';
import EyeIcon from '../../assets/see-eye.svg?react';
import EyeSeen from '../../assets/eyes-seen.svg?react';
import './MovieDetail.css';
import {useAuthentication} from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";

function MovieDetail({movieId}) {
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(null);
    const {username} = useAuthentication();
    const [movieIsFavorite, setMovieIsFavorite] = useState(false);
    const [movieisSeen, setMovieSeen] = useState(false);

    const checkIfFavorite = async (movieId) => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${username}/favorite-movies`);
            if (response.status === 200) {
                const favoriteMovies = response.data;
                const isFavorite = favoriteMovies.some(movie => movie.id === movieId);
                setMovieIsFavorite(isFavorite);
            } else {
                console.error(`Failed to retrieve favorite movies. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching favorite movies:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieResponse, favoriteMoviesResponse, seenMoviesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/movie/${movieId}`),
                    axios.get(`http://localhost:8080/users/${username}/favorite-movies`),
                    axios.get(`http://localhost:8080/users/${username}/seen-movies`)
                ]);

                if (movieResponse.status === 200) {
                    setMovie(movieResponse.data);
                } else {
                    console.error(`Failed to retrieve movie details. Status: ${movieResponse.status}`);
                }

                if (favoriteMoviesResponse.status === 200) {
                    const favoriteMovies = favoriteMoviesResponse.data;
                    const isFavorite = favoriteMovies.some(movie => movie.id === movieId);
                    setMovieIsFavorite(isFavorite);
                } else {
                    console.error(`Failed to retrieve favorite movies. Status: ${favoriteMoviesResponse.status}`);
                }
                if (seenMoviesResponse.status === 200) {
                    const seenMovies = seenMoviesResponse.data;
                    const isSeen = seenMovies.some(movie => movie.id === movieId);
                    setMovieSeen(isSeen);
                } else {
                    console.error(`Failed to retrieve favorite movies. Status: ${favoriteMoviesResponse.status}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (movieId) {
            fetchData();
        }
    }, [movieId, username]);

    const getReleaseYear = (releaseDate) => {
        return new Date(releaseDate).getFullYear();
    };

    const addToFavorites = async () => {
        try {
            if (movieIsFavorite) {
                // If the movie is already a favorite, remove it from favorites
                const movieId = [{id: movie.id}];
                const response = await axios.delete(`http://localhost:8080/users/${username}/favorite-movies`, {
                    data: movieId
                });
                if (response.status === 200) {
                    console.log('Film is verwijderd uit favorieten!');
                    setMovieIsFavorite(false); // Update state after successfully removing from favorites
                } else {
                    console.error(`Failed to remove movie from favorites. Status: ${response.status}`);
                }
            } else {
                // If the movie is not a favorite, add it to favorites
                const favoriteMovies = [{id: movie.id}];
                const response = await axios.post(`http://localhost:8080/users/${username}/favorite-movies`, favoriteMovies);
                if (response.status === 200) {
                    console.log('Film is toegevoegd aan favorieten!');
                    setMovieIsFavorite(true); // Update state after successfully adding to favorites
                } else {
                    console.error(`Failed to add movie to favorites. Status: ${response.status}`);
                }
            }
        } catch (error) {
            console.error('Error adding/removing movie to/from favorites:', error);
        }
    };

    const addSeeMovies = async () => {
        try {
            if (movieisSeen) {
                // If the movie is already a see, remove it from see list
                const movieId = [{id: movie.id}];
                const response = await axios.delete(`http://localhost:8080/users/${username}/seen-movies`, {
                    data: movieId
                });
                if (response.status === 200) {
                    console.log('Film is verwijderd uit gezien lijst!');
                    setMovieSeen(false); // Update state after successfully removing from seen
                } else {
                    console.error(`Failed to remove movie from favorites. Status: ${response.status}`);
                }
            } else {
                // If the movie is not a seen, add it to see list
                const seenMovies = [{id: movie.id}];
                const response = await axios.post(`http://localhost:8080/users/${username}/seen-movies`, seenMovies);
                if (response.status === 200) {
                    console.log('Film is toegevoegd aan gezien lijst!');
                    setMovieSeen(true); // Update state after successfully adding to favorites
                } else {
                    console.error(`Failed to add movie to see list. Status: ${response.status}`);
                }
            }
        } catch (error) {
            console.error('Error adding/removing movie to/from see list:', error);
        }
    };


    return (
        <div className="movie-detail">
            {movie ? (
                <>
                    <div className="movie-img">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.imageUrl}`} alt={movie.title}/>
                    </div>
                    <div className="movie-info">
                        <h1 className="movie-info-title">{movie.title}</h1>
                        <p className="movie-info-slogan">{movie.slogan}</p>
                        <p className="movie-rating">Rating: {rating}</p>
                        <div className="movie-meta">
                            <p>Director: {movie.director}</p>
                            <p>Release Date: {getReleaseYear(movie.releaseDate)}</p>
                        </div>
                        <h2 className="movie-genre">Genres</h2>
                        <ul className="movie-genre--list">
                            {movie.genres.map((genre, index) => (
                                <li key={index} className="movie-genre--title">{genre}</li>
                            ))}
                        </ul>
                        <h3 className="movie-description">Description</h3>
                        <p className="movie-description--text">{movie.description}</p>
                        <div className="movie-personal">
                            <div className="movie-personal--icns">
                                <span className="movie-plus">
                                    <PlusIcon/>
                                </span>
                                <span className="movie-see" onClick={addSeeMovies}>
                                    {movieisSeen ? <EyeSeen/> : <EyeIcon/>}
                                </span>
                            </div>
                            <button className="movie-add-favorite" onClick={addToFavorites}>
                                <span className="movie-heart"></span>
                                {movieIsFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading movie details...</p>
            )}
        </div>
    );
}

export default MovieDetail;
