import express from 'express';
import { createClient } from '@supabase/supabase-js';
import postsRouter from './src/api/posts'; 
import commentsRouter from './src/api/comment'; 
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json()); 

app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
