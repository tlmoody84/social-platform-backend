import { Request, Response, Router } from 'express';
import { supabase } from '../db/supabase'; 
import validateContent from '../middleware/validateContent';

const router = Router(); 

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, error } = await supabase
            .from('Post')
            .select('*');

        if (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch posts' });
            return;  
        }

        res.status(200).json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

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

router.put('/:id', validateContent, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const { data, error } = await supabase
            .from('Post')
            .update({ content })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ message: error.message || 'Failed to update post' });
            return;  
        }

        res.status(200).json({ message: 'Post updated successfully', post: data });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('Post')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: error.message || 'Failed to delete post' });
            return;  
        }

        res.status(204).send(); 
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

export default router;
