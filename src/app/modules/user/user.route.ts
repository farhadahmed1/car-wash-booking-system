import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginUserValidationSchema),
  UserController.loginUser,
);

export const UserRoutes = router;
