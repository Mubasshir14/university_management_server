import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import config from '../../app/config';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

const userLogin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
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
    message: 'User logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const userLogout: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    sendResponse(res, {
      success: false,
      message: 'No token provided',
      statusCode: 400,
      data: '',
    });
    return;
  }

  await AuthService.userLogoutFromDB(token);
  res.clearCookie('token', { httpOnly: true, secure: true });
  sendResponse(res, {
    success: true,
    message: 'Logout successful',
    statusCode: 200,
    data: '',
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;

  await AuthService.changePassword(user, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password changed successfully!',
    data: null,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { authorization } = req.headers;

  const result = await AuthService.refreshToken(authorization as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  });
});

export const AuthController = {
  userLogin,
  changePassword,
  refreshToken,
  userLogout,
};
