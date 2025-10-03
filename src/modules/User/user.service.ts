import { IUser, UserRole } from './user.interface';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import User from './user.model';
import { StudentID } from '../StudentID/studentid.model';
import crypto from 'crypto';
import config from '../../app/config';
import { sendUserVerificationEmail } from '../../app/utils/sendUserVerificationEmail';

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

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60);

  const user = new User({
    ...userData,
    isVerified: false,
    verificationToken,
    verificationTokenExpires,
  });
  await user.save();

  const verificationUrl = `${config.CLIENT_URL}/verify-email?token=${verificationToken}`;
  await sendUserVerificationEmail(user.email, verificationUrl);

  return {
    message: 'Registration pending. Please check your email to verify.',
  };
};

export const UserServices = {
  registerUser,
};
