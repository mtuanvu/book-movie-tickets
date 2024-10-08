
# Movie Ticket Booking Application

This application allows users to select available movie tickets, view booked tickets in real-time, and book tickets, with a seat-locking system that expires after 10 minutes.

## Backend (BE)

The Backend is built with Node.js and Firebase Firestore for storing movie and seat data. It provides APIs for fetching available movies, selecting seats, and updating seat statuses.

### Setup Instructions for Backend

1. Clone the repository:
   ```
   https://github.com/mtuanvu/book-movie-tickets.git
   cd book-movie-tickets-be

2. Install dependencies:
   npm install

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   FIREBASE_PRIVATE_KEY="Your Firebase Private Key"
   FIREBASE_CLIENT_EMAIL="Your Firebase Client Email"
   FIREBASE_PROJECT_ID="Your Firebase Project ID"
   ```

4. Start the backend server:
   ```
   npm start
   ```
   The backend will run on `http://localhost:3001`.

### API Endpoints

- **GET /api/movies**: Fetches the list of available movies and seats.
- **PUT /api/movies/:id/seats**: Updates the seat status (locks seats, marks as booked).

---

## Frontend (FE)

The Frontend is built with React and communicates with the backend to display available movies and handle seat selection.

### Setup Instructions for Frontend

1. Clone the repository:
   ```
   cd book-movie-tickets-fe
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend server:
   ```
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

### Features

- Displays a list of available movies.
- Users can select seats, and changes are reflected in real-time.
- Locked seats are automatically released after 10 minutes if not confirmed.
