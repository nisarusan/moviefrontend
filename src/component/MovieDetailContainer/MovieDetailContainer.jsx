import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../../component/MovieDetail/MovieDetail.jsx';

function MovieDetailContainer() {
    const { id } = useParams();

    const movieId = parseInt(id);

    return <MovieDetail movieId={movieId} />;
}

export default MovieDetailContainer;
