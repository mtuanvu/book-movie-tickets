// const admin = require('firebase-admin');
// require('dotenv').config();

// // Cấu hình Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert({
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//   }),
// });

// const db = admin.firestore();

// // Danh sách phim và trạng thái ghế ngồi
// const movies = [
//   {
//     id: 'movie1',
//     title: 'Avengers: Endgame',
//     seats: [
//       { number: 1, status: 'available' },
//       { number: 2, status: 'booked' },
//       { number: 3, status: 'available' },
//       { number: 4, status: 'booked' },
//       // Thêm ghế tiếp theo...
//     ],
//   },
//   {
//     id: 'movie2',
//     title: 'Project Gemini',
//     seats: [
//       { number: 1, status: 'available' },
//       { number: 2, status: 'available' },
//       { number: 3, status: 'booked' },
//       { number: 4, status: 'available' },
//       // Thêm ghế tiếp theo...
//     ],
//   },
// ];

// // Hàm thêm phim vào Firestore
// const addMoviesToFirestore = async () => {
//   try {
//     for (const movie of movies) {
//       const movieRef = db.collection('movies').doc(movie.id);
//       await movieRef.set({
//         title: movie.title,
//         seats: movie.seats,
//       });
//       console.log(`Phim "${movie.title}" đã được thêm vào Firestore.`);
//     }
//   } catch (error) {
//     console.error('Lỗi khi thêm phim:', error);
//   }
// };

// // Gọi hàm để thêm dữ liệu phim và ghế ngồi vào Firestore
// addMoviesToFirestore();
