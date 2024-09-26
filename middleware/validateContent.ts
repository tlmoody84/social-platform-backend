import { Request, Response, NextFunction } from 'express';

// Middleware to validate the content of a post
export const validateContent = (req: Request, res: Response, next: NextFunction): void => {
  const { content } = req.body;
  
  if (!content || typeof content !== 'string' || content.trim() === '') {
    res.status(400).json({ error: 'Content must be a non-empty string.' });
    return; // Ensure that the function ends after sending a response
  }

  // Call next() to pass control to the next middleware or route handler
  next();
};
