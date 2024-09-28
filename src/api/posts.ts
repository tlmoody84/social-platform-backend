import { Request, Response, Router } from 'express';
import { supabase } from '../db/supabase';
import validateContent from '../middleware/validateContent';
const router = Router();
// Fetch posts along with their comments and likes
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch posts with related comments
        const { data: posts, error } = await supabase
            .from('post')  // Ensure table name matches the actual schema
            .select(`
                *,
                comment (*)
            `);
        if (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch posts' });
            return;
        }
        // Fetch like counts separately for each post
        for (const post of posts) {
            const { count: likeCount, error: likeCountError } = await supabase
                .from('postlike')
                .select('id', { count: 'exact', head: true })  // Use head: true to get the count
                .eq('postid', post.id);  // Use lowercase for the column name
            if (likeCountError) {
                console.error('Error fetching like count:', likeCountError);
                post.like_count = 0;  // Default to 0 if there's an error
            } else {
                post.like_count = likeCount || 0;  // Use the count directly
            }
        }
        res.status(200).json(posts);
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});
// Create a new post
router.post('/', validateContent, async (req: Request, res: Response): Promise<void> => {
    const { content } = req.body;
    try {
        const { data, error } = await supabase
            .from('post')  // Ensure table name is lowercase
            .insert([{ content }])
            .select();
        if (error) {
            console.error('Error inserting post:', error);
            res.status(500).json({ message: error.message || 'Failed to create post' });
            return;
        }
        res.status(201).json({ message: 'Post created successfully', post: data });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});
// Update a post by ID
router.put('/:id', validateContent, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const { data, error } = await supabase
            .from('post')  // Ensure table name is lowercase
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
// Delete a post by ID
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('post')  // Ensure table name is lowercase
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
