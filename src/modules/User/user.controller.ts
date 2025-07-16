import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import config from '../../app/config';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { UserServices } from './user.service';

const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registration completed successfully!',
    data: {
      accessToken,
    },
  });
});

export const UserController = {
  registerUser,
};
