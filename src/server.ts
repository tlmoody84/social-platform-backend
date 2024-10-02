import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  
import postsRouter from './api/posts';
import commentsRouter from './api/comment';
import postLikesRouter from './api/postLikes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: 'https://social-platform-frontend.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

app.use(express.json());
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/likes', postLikesRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Social Platform API!');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
