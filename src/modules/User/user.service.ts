import { IUser, UserRole } from './user.interface';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import User from './user.model';
import { AuthService } from '../Auth/auth.service';
import { StudentID } from '../StudentID/studentid.model';

const registerUser = async (userData: IUser) => {
  if (userData.role === UserRole.ADMIN) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Invalid role. Only User is allowed.',
    );
  }

  const existingUserByEmail = await User.findOne({ email: userData.email });
  if (existingUserByEmail) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Email is already registered',
    );
  }

  const existingUserByPhone = await User.findOne({ phone: userData.phone });
  if (existingUserByPhone) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Phone is already used');
  }

  const existingUserByNID = await User.findOne({ nid: userData.nid });
  if (existingUserByNID) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'NID is already used');
  }

  const searchStudentID = await StudentID.findOne({
    student_id: userData.student_id,
  });
  if (!searchStudentID) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Invalid Student Id.');
  }

  const existingUserByStudentID = await User.findOne({
    student_id: userData.student_id,
  });
  if (existingUserByStudentID) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Student ID is already used',
    );
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
