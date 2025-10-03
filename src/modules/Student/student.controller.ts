import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { StudentService } from './student.service';

const createStudent = catchAsync(async (req, res) => {
  const studentData = req.body;
  const image = req.file;
  const user = req.user;
console.log('Student dat controller', studentData);
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

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudent();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched succesfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentService.getSingleStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
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

const getStudentBySession = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await StudentService.getStudentBySession(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched accordint to semester succesfully',
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

const dashboradDepBasedStudent = catchAsync(async (req, res) => {
  const result = await StudentService.dashboradDepBasedStudent();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched accordint to dashboard dept succesfully',
    data: result,
  });
});

const dashboradSemBasedStudent = catchAsync(async (req, res) => {
  const result = await StudentService.dashboradSemBasedStudent();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched accordint to dashboard sem succesfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentService.deleteStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const updateImformationByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentService.updateImformationByAdmin(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Updated successfully',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  makeApproval,
  getAllStudent,
  getSingleStudent,
  getStudentByDepartment,
  getStudentBySession,
  getStudentBySemester,
  getNotApprovedStudent,
  getApprovedStudent,
  getMeAsStudentData,
  dashboradDepBasedStudent,
  dashboradSemBasedStudent,
  deleteStudent,
  updateImformationByAdmin,
};
