/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = () => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      success: false,
      message: err.message,
      err: err,
    });
  };
};

export default globalErrorHandler;
