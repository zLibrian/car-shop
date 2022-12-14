import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import errorMessage from '../utils/errorMessages';

function handleError(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues });
  }

  const customError = errorMessage[err.message];
  if (customError) {
    return res.status(Number(customError.code)).json({ error: customError.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
}
export default handleError;