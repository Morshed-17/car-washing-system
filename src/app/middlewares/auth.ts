import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { TUserRoles } from '../modules/User/user.interface';
import config from '../config';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(
        token as string,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      const { email, role } = decoded;

      const user = User.findOne({ email, role });

      if (!user) {
        throw new Error();
      }

      if (!requiredRoles.includes(role)) {
        throw new Error();
      }
      req.user = {
        email,
        role,
      };

      next();
    } catch (err) {
      res.status(404).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }
  };
};

export default auth;
