import config from '../../config';
// import bcrypt from 'bcrypt';
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
  // checking if the user is exist
  // console.log(payload)
  const user = await User.isUserExistsByEmail(payload.email);
  // console.log(user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.Jwt_refresh_expires_in as string,
  );

  return {
    accessToken: `Bearer ${accessToken}`,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
