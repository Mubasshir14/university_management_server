
import { IUser, UserRole } from './user.interface';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import User from './user.model';
import { AuthService } from '../Auth/auth.service';


const registerUser = async (userData: IUser) => {
  if (userData.role === UserRole.ADMIN) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Invalid role. Only User is allowed.');
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Email is already registered');
  }

  const user = new User(userData);
  await user.save();

  return await AuthService.loginUser({
    email: user.email,
    password: userData.password,
  });
};


export const UserServices = {
  registerUser,
};
