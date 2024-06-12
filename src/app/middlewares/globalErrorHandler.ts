/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    err: err,
  });
};

export default globalErrorHandler;
