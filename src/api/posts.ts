// import { Router, Request, Response } from 'express';
// import { supabase } from '../../supabaseClient';
// import { validateContent

  
//  } from './middleware/validateContent';
// interface Post {
//   id: number;  
//   content: string;
//   timestamp: string; 
// }

// const router = Router();

// router.post('/posts', validateContent, async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { content } = req.body;

//     const { data, error } = await supabase
//       .from('Post') 
//       .insert([{ content, timestamp: new Date().toISOString() }]); 

//     if (error) {
//       res.status(500).json({ error: error.message });
//       return; 
//     }

//     router.post('/', async (req: Request, res: Response): Promise<void> => {
//       const { content } = req.body;
//       res.status(201).json({ message: "Post created!" });
//   });


//     res.status(201).json(data);
//   } catch (error: any) {
//     console.error("Error creating post:", error); 
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// export default router;








import { Router, Request, Response } from 'express';
import { supabase } from '../../supabaseClient';
import { validateContent

  
  } from './middleware/validateContent';

const router = Router();

// Create a new post
router.post('/', validateContent, async (req: Request, res: Response): Promise<void> => {
    try {
        const { content } = req.body;

        const { data, error } = await supabase
            .from('Post') 
            .insert([{ content, timestamp: new Date().toISOString() }]); 

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(201).json(data);
    } catch (error: any) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
