import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { StudentService } from './student.service';

const createStudent = catchAsync(async (req, res) => {
  const studentData = req.body;
  const image = req.file;
  const user = req.user;

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

const makeApproval = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentService.makeApproval(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student approved successfully',
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

const getStudentByDepartment = catchAsync(async (req, res) => {
  const { id } = req.body;

  const result = await StudentService.getStudentByDepartment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched accordint to department succesfully',
    data: result,
  });
});

const getStudentBySemester = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await StudentService.getStudentBySemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched accordint to semester succesfully',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  makeApproval,
  getStudentByDepartment,
  getStudentBySemester,
  getNotApprovedStudent,
  getApprovedStudent,
  getMeAsStudentData,
};
