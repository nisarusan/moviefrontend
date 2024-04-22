import React from 'react';
import { useMovieContext } from '../../context/MovieContext.jsx';
import MovieDetail from '../../component/MovieDetail/MovieDetail.jsx';

function MovieDetailContainer() {
    const { selectedMovieId } = useMovieContext();

    return selectedMovieId ? <MovieDetail movieId={selectedMovieId} /> : null;
}

export default MovieDetailContainer;