import { Router, Request, Response } from 'express';
import { supabase } from '../../supabaseClient'; 
import { validateContent } from './middleware/validateContent'; 




interface Comment {
  id: number; 
  PostID: number; 
  content: string;
  timestamp: string; 
  
}

const router = Router();

router.post('/:postId', validateContent, async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params; 
    const { content } = req.body; 

    const { data, error } = await supabase
      .from('comment') 
      .insert([{ PostID: postId, content, timestamp: new Date().toISOString() }]); 

    if (error) {
      res.status(500).json({ error: error.message });
      return; 
    }

    router.post('/', async (req: Request, res: Response): Promise<void> => {
      const { postId, content } = req.body;
      res.status(201).json({ message: "Comment created!" });
  });
  


    res.status(201).json(data);
  } catch (error: any) {
    console.error("Error creating comment:", error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:postId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params; 
    const { data, error } = await supabase
      .from('comment')
      .select('*')
      .eq('PostID', postId); 

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
