import React, { useState, useEffect } from 'react';

const MovieList = ({ selectMovie }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error('Error fetching movies:', err));
  }, []);

  return (
    <div>
      <h1>Available Movies</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => selectMovie(movie.id)}>
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
