import React, { useState, useEffect } from 'react';

const SeatSelection = ({ movieId }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => setSeats(data.seats))
      .catch((err) => console.error('Error fetching seats:', err));
  }, [movieId]);

  const handleSeatClick = (seatNumber) => {
    const updatedSeats = seats.map((seat) =>
      seat.number === seatNumber ? { ...seat, status: 'locked' } : seat
    );

    fetch(`http://localhost:3001/api/movies/${movieId}/seats`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seats: updatedSeats }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSeats(updatedSeats);
      })
      .catch((err) => console.error('Error updating seats:', err));
  };

  return (
    <div>
      <h1>Select Seats</h1>
      <div>
        {seats.map((seat) => (
          <button
            key={seat.number}
            disabled={seat.status !== 'available'}
            onClick={() => handleSeatClick(seat.number)}
          >
            {seat.number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;
