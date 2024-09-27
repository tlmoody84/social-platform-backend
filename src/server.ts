import express from 'express';
import postsRouter from './api/posts'; 

const app = express();
app.use(express.json());
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.send('Welcome To My Social Platform!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});











// import express from 'express';
// import { createClient } from '@supabase/supabase-js';
// import postsRouter from './api/posts'; 
// import commentsRouter from './api/comment';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Define routes
// app.use('/api/posts', postsRouter);
// app.use('/api/comments', commentsRouter);

// // Error handling middleware
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     console.error(err.stack);
//     res.status(500).json({ error: err.message });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
