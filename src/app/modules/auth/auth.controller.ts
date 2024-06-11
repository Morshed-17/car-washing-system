import { RequestHandler } from 'express';
import { AuthServices } from './auth.service';

const signUp: RequestHandler = async (req, res) => {
  try {
    const result = await AuthServices.signUp(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

export const AuthControllers = {
  signUp,
};
