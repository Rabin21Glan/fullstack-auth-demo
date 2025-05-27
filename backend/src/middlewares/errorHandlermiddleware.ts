import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES } from '../utils/messages';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || ERROR_MESSAGES.SERVER_ERROR;

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = ERROR_MESSAGES.INVALID_TOKEN;
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = ERROR_MESSAGES.INVALID_TOKEN;
  }

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    statusCode = 400;
    message = 'Database operation failed';
  }

  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};