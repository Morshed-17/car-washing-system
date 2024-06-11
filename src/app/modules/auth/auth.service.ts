import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';

const signUp = (payload: TUser) => {
  const result = User.create(payload);
  return result;
};

export const AuthServices = {
  signUp,
};
