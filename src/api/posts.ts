import { Request, Response, Router } from 'express';
import { supabase } from '../db/supabase'; 
import validateContent from '../middleware/validateContent';

const router = Router(); 

// router.post('/', validateContent, async (req: Request, res: Response): Promise<void> => {
//     const { content } = req.body;

//     if (!content || typeof content !== 'string' || content.trim() === '') {
//         res.status(400).json({ message: 'Content is required and must be a non-empty string.' });
//         return;
//     }

//     const { data, error } = await supabase
//         .from('Post')
//         .insert([{ content }])
//         .select(); 

//     if (error) {
//         res.status(500).json({ message: error.message });
//         return;
//     }

//     res.status(201).json({ message: 'Post created successfully', post: data });
// });

// router.get('/', async (req: Request, res: Response): Promise<void> => {
//     const { data, error } = await supabase
//         .from('Post')
//         .select('*');

//     if (error) {
//         res.status(500).json({ message: error.message });
//         return;
//     }

//     res.status(200).json(data);
// });

// export default router;








router.post('/', validateContent, async (req: Request, res: Response): Promise<void> => {
    const { content } = req.body;

    try {
        const { data, error } = await supabase
            .from('Post')
            .insert([{ content }])
            .select(); 

        if (error) {
            console.error('Error inserting post:', error);
            console.error('Full error response:', JSON.stringify(error, null, 2));
            res.status(500).json({ message: error.message || 'Failed to create post' });
            return;  
        }

        res.status(201).json({ message: 'Post created successfully', post: data });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});
