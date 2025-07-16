import httpStatus from 'http-status';
import { AcademicDepartmentServices } from './academicDepartment.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createAcademicDepartmemt = catchAsync(async (req, res) => {

  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body,  req.file,);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created succesfully',
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is retrieved succesfully',
    data: result,
  });
});

const updateAcademicDeartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is updated succesfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartmemt,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDeartment,
};
