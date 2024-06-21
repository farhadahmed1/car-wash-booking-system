import bcrypt from 'bcrypt';
import config from '../../config';
import { TLoginInfo, TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { createToken } from './user.utils';

const createUserIntoDB = async (payload: TUser) => {
  const isUserExists = await User.findOne({ email: payload.email });

  if (isUserExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'This email is Already Exists!!!');
  }
  const newUser = await User.create(payload);

  const result = await User.findById(newUser._id).select('-password');

  return result;
};

const loginUser = async (payload: TLoginInfo) => {
  const { email, password } = payload;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found please Register!!!',
    );
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.Jwt_refresh_expires_in as string,
  );

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'Please enter valid password');
  }

  const validateUser = await User.findOne({ email: email }).select('-password');

  return { validateUser, token: accessToken };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
