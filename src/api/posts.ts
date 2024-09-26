import { Router, Request, Response } from 'express';
import { supabase } from '../../supabaseClient';
import { validateContent

  
 } from '../../middleware/validateContent';
// Define the Post interface to match your database schema
interface Post {
  id: number;  // Assuming the ID is a number
  content: string;
  timestamp: string; // Format based on your database
}

const router = Router();

// Create a new post route
router.post('/posts', validateContent, async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    // Insert post into the database
    const { data, error } = await supabase
      .from('Post') // Just specify the table name
      .insert([{ content, timestamp: new Date().toISOString() }]); // Format timestamp correctly

    // Check for errors
    if (error) {
      res.status(500).json({ error: error.message });
      return; // Exit the function early
    }

    // Respond with the newly created post
    res.status(201).json(data);
  } catch (error: any) {
    // Handle unexpected errors
    console.error("Error creating post:", error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
