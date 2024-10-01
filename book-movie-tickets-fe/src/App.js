import React, { useState } from 'react';
import MovieList from './components/MovieList';
import SeatSelection from './components/SeatSelection';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="App">
      {!selectedMovie ? (
        <MovieList selectMovie={setSelectedMovie} />
      ) : (
        <SeatSelection movieId={selectedMovie} />
      )}
    </div>
  );
}

export default App;
