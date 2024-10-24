import React from 'react';
import { Link } from 'react-router-dom';
import MovieActions from "../../component/MovieActions/MovieActions.jsx";

export default function MovieList({ data }) {
    return (
        <div className="movie-list">
            {data.map(({ title, releaseDate: release_date, imageUrl: poster_path, id }) => (
                <div key={id} className="movie-item">
                    <Link to={`/movie/${id}`} className="movie-link">
                        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
                        <div className="movie-description">
                            <h1>{title}</h1>
                            <h1>{release_date ? release_date.substring(0, 4) : 'N/A'}</h1>
                        </div>
                    </Link>
                    <MovieActions movieId={id} showAsButton={false} />
                </div>
            ))}
        </div>
    );
}