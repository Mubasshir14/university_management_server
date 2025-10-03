import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { UserServices } from './user.service';
import User from './user.model';
import AppError from '../../app/errors/AppError';

const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.message,
    data: null,
  });
});

const verifyEmail: RequestHandler = catchAsync(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid or expired token');
  }

  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpires = null;
  await user.save();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Email verified successfully. You can now log in!',
    data: '',
  });
});

export const UserController = {
  registerUser,
  verifyEmail,
};
