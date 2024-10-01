require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const http = require('http');
const { Server } = require('socket.io');

// Firebase Admin SDK Configuration
admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    project_id: process.env.FIREBASE_PROJECT_ID,
  }),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

const port = 3001;

// Socket.io for real-time seat updates
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('selectSeat', async ({ movieId, seatNumber }) => {
    const movieRef = db.collection('movies').doc(movieId);
    const movieSnapshot = await movieRef.get();

    if (movieSnapshot.exists) {
      const movieData = movieSnapshot.data();
      const seats = movieData.seats;

      const seat = seats.find((seat) => seat.number === seatNumber);
      if (seat.status === 'available') {
        seat.status = 'locked'; // Lock the seat
        await movieRef.update({ seats });

        // Broadcast updated seat status to all users
        io.emit('seatStatusUpdated', { movieId, seats });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// API to get movies
app.get('/api/movies', async (req, res) => {
  const moviesSnapshot = await db.collection('movies').get();
  const movies = moviesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.json(movies);
});

// API to update seat status
app.put('/api/movies/:id/seats', async (req, res) => {
  const movieId = req.params.id;
  const updatedSeats = req.body.seats;

  const movieRef = db.collection('movies').doc(movieId);
  await movieRef.update({ seats: updatedSeats });

  res.json({ message: 'Seats updated successfully' });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
