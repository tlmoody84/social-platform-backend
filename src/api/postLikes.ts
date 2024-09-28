import { Router, Request, Response } from 'express';
import { supabase } from '../db/supabase';

const router = Router();

export const addLikeToPost = async (req: Request, res: Response) => {
    const { id: postId } = req.params; 

    const { data: post, error: postError } = await supabase
        .from('post')
        .select('id')
        .eq('id', postId)
        .single();

    if (postError || !post) {
        return res.status(404).json({ message: "Post not found." });
    }

    const { data, error } = await supabase
        .from('postlike')
        .insert([{ PostID: postId, CommentID: null }])
        .select();

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: 'Like added to post.', like: data });
};

export const addLikeToComment = async (req: Request, res: Response) => {
    const { id: commentId } = req.params; 

    const { data: comment, error: commentError } = await supabase
        .from('comment')
        .select('id, PostID')
        .eq('id', commentId)
        .single();

    if (commentError || !comment) {
        return res.status(404).json({ message: "Comment not found." });
    }

    const { data, error } = await supabase
        .from('postlike')
        .insert([{ PostID: comment.PostID, CommentID: commentId }]) 
        .select();

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: 'Like added to comment.', like: data });
};

export default router;