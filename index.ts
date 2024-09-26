import express from 'express';
import { createClient } from '@supabase/supabase-js';
import routes from './routes';
import postsRouter from './routes/posts';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api', routes);
app.use('/posts', postsRouter);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
