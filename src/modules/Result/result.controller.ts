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
    message: 'Student is enrolled succesfully',
    data: result,
  });
});

export const ResultController = {
  generateStudentResult,
};
