import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const signUp = async (payload: TUser) => {
  const result = await User.create({ ...payload, role: 'user' });
  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  const match = await bcrypt.compare(payload?.password, user?.password);
  if (!match) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is incorrect');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires,
  });

  return {
    token,
    user,
  };
};

const getSingleUser = async (id: string) => {
  const ressult = await User.findById(id);
  return ressult;
};
const updateUser = async (id: string, payload: Partial<TUser>) => {
  const ressult = await User.findByIdAndUpdate(id, payload, { new: true });
  return ressult;
};

export const AuthServices = {
  signUp,
  login,
  getSingleUser,
  updateUser,
};
