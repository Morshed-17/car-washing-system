import { RequestHandler } from 'express';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';

const signUp: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.signUp(req.body);
  res.send(result);
});

export const AuthControllers = {
  signUp,
};
