// import express from 'express';
// import dotenv from 'dotenv';
// import postsRouter from './api/posts';
// import commentsRouter from './api/comment'; 
// import postLikesRouter from './api/postLikes'; 

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4001;

// app.use(express.json());
// app.use('/api/posts', postsRouter);
// app.use('/api/comments', commentsRouter);
// app.use('/api/likes', postLikesRouter);

// app.get('/', (req, res) => {
//     res.send('Welcome to the Social Platform API!');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
















import express from 'express';
import dotenv from 'dotenv';
import postsRouter from './api/posts';
import commentsRouter from './api/comment';
import postLikesRouter from './api/postLikes';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;
// Middleware
app.use(express.json());
// Routes
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/likes', postLikesRouter);
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Social Platform API!');
});
// Start server (only for local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
// Export the app for Vercel
export default app;













