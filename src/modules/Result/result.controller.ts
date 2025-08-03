import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { ResultService } from './result.service';
import httpStatus from 'http-status';

const generateStudentResult = catchAsync(async (req, res) => {
  const { registrationId } = req.params;
  const courseMarksData = req.body;
  const result = await ResultService.generateStudentResult(
    registrationId,
    courseMarksData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student reault is created succesfully',
    data: result,
  });
});

const getAllStudentResult = catchAsync(async (req, res) => {
  const result = await ResultService.getAllStudentResult();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student result fetched succesfully',
    data: result,
  });
});

const getMyResult = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await await ResultService.getMyResult(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student result fetched succesfully',
    data: result,
  });
});

export const ResultController = {
  generateStudentResult,
  getAllStudentResult,
  getMyResult,
};
