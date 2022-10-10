import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

function handleError(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues });
  }
  return res.status(500).json({ message: 'Internal server error' });
}
export default handleError;