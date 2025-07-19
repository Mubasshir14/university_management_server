import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { StudentService } from './student.service';

const createStudent = catchAsync(async (req, res) => {
  const studentData = req.body;
  const image = req.file;
  const user = req.user;
  console.log(user);

  const result = await StudentService.createStudentIntoDB(
    studentData,
    image,
    user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});

const getNotApprovedStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getNotApprovedStudent();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched succesfully',
    data: result,
  });
});

const getApprovedStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getApprovedStudent();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched succesfully',
    data: result,
  });
});

const getMeAsStudentData = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await StudentService.getMeAsStudentData(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched succesfully',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getNotApprovedStudent,
  getApprovedStudent,
  getMeAsStudentData,
};
