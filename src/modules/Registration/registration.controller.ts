import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { RegistrationService } from './registrstion.sservice';

const createRegistration = catchAsync(async (req, res) => {
  const result = await RegistrationService.createRegistration(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration is done succesfully',
    data: result,
  });
});

const getMyRegistrationInformation = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await RegistrationService.getMyRegistrationInformation(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration info got succesfully',
    data: result,
  });
});

const getStudentByCourse = catchAsync(async (req, res) => {
  const { id } = req.body;

  const result = await RegistrationService.getStudentByCourse(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched accordint to course succesfully',
    data: result,
  });
});

const getNotApprovedRegisteredStudent = catchAsync(async (req, res) => {
  const result = await RegistrationService.getNotApprovedRegisteredStudent();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched succesfully',
    data: result,
  });
});

const getApprovedRegisteredStudent = catchAsync(async (req, res) => {
  const result = await RegistrationService.getApprovedRegisteredStudent();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched succesfully',
    data: result,
  });
});

const makeRegistrationApproval = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await RegistrationService.makeRegistrationApproval(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration approved successfully',
    data: result,
  });
});

export const RegistrationController = {
  createRegistration,
  getMyRegistrationInformation,
  getStudentByCourse,
  getApprovedRegisteredStudent,
  getNotApprovedRegisteredStudent,
  makeRegistrationApproval,
};
