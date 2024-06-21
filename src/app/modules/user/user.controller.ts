import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await UserServices.createUserIntoDB(body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await UserServices.loginUser(body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    token: result.token,
    message: 'User logged in successfully',
    data: result.validateUser,
  });
});

export const UserController = {
  createUser,
  loginUser,
};
