import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import { TUserRoles } from '../modules/User/user.interface';
import config from '../config';
import { User } from '../modules/User/user.model';
import { TJwtPayload } from '../interface/JwtPayload';
import AppError from '../errors/AppError';

const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { email, role } = decoded;

    const user = User.findOne({ email, role });

    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    req.user = {
      email,
      role,
    };

    next();
  });
};

export default auth;
