import { Request, Response, NextFunction } from 'express';

export const validateContent = (req: Request, res: Response, next: NextFunction): void => {
  const { content } = req.body;
  
  if (!content || typeof content !== 'string' || content.trim() === '') {
    res.status(400).json({ error: 'Content must be a non-empty string.' });
    return;
  }

  next();
};
