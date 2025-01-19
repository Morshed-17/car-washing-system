import { RequestHandler } from 'express';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';

const signUp: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.signUp(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});
const login: RequestHandler = catchAsync(async (req, res) => {
  const { token, user } = await AuthServices.login(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfuly',
    token,
    data: user,
  });
});

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AuthServices.getSingleUser(id as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});
const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AuthServices.updateUser(id as string, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

export const AuthControllers = {
  signUp,
  login,
  getSingleUser,
  updateUser
};
