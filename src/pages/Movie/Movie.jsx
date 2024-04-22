import './Movie.css';
import SearchComp from "../../component/SearchComp/SearchComp.jsx";
import React, {useState} from "react";
function Movie() {
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const handleMovieSelection = (movieId) => {
        setSelectedMovieId(movieId);
    };
return (
    <>
            <h2>Movie Search</h2>
            {selectedMovieId && <SearchComp movieid={selectedMovieId}/>}
    </>
);
}

export default Movie;