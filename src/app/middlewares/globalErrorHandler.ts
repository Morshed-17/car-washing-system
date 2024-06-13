/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went went';
  const errorMessages= [
    {
      path: '',
      message: err.message,
    },
  ];

  res.status(statusCode).json({
    err,
    success: false,
    message,
    errorMessages,
    stack: err.stack,
  });
};

export default globalErrorHandler;
