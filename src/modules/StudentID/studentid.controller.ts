import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { StudentIDService } from './studentid.service';

const createStudentID = catchAsync(async (req, res) => {
  const studentIDData = req.body;
  const result = await StudentIDService.createStudentID(studentIDData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student ID is created succesfully',
    data: result,
  });
});

const getStudentID = catchAsync(async (req, res) => {
  const result = await StudentIDService.getAllStudenID();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student ID fetched successfully',
    data: result,
  });
});

const getSingleStudentID = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentIDService.getSingleStudentID(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student ID fetched successfully',
    data: result,
  });
});

const deleteStudentID = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentIDService.deleteSingleStudentID(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student ID deleted successfully',
    data: result,
  });
});

export const StudentIDController = {
  createStudentID,
  getStudentID,
  getSingleStudentID,
  deleteStudentID,
};
