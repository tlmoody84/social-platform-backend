import { Router, Request, Response } from 'express';
import { supabase } from '../db/supabase'; 
import validateContent from '../middleware/validateContent';

const router = Router();

router.post('/:id', validateContent, async (req: Request<{ id: string }, any, { content: string }>, res: Response): Promise<void> => {
    const { id } = req.params;   
    const { content } = req.body; 

    const { data: postExists, error: postError } = await supabase
        .from('Post')
        .select('id')
        .eq('id', id)
        .single();

        if (postError || !postExists) {
            res.status(404).json({ error: 'Post not found' });
            return; 
        }

    const { data, error } = await supabase
        .from('comment')
        .insert([{ PostID: id, content }])
        .single();

        if (error) {
            res.status(500).json({ error: error.message });
            return; 
        }

    res.status(201).json(data);
});

export default router; 