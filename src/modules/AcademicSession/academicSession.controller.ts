import httpStatus from 'http-status';
import { AcademicSessionServices } from './academicSession.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createAcademicSession = catchAsync(async (req, res) => {
  const result = await AcademicSessionServices.createAcademicSessionIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created succesfully',
    data: result,
  });
});

const getAllAcademicSessions = catchAsync(async (req, res) => {
  const result = await AcademicSessionServices.getAllAcademicSessionsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSession = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result =
    await AcademicSessionServices.getSingleAcademicSessionFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const updateAcademicSession = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSessionServices.updateAcademicSessionIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicSessionControllers = {
  createAcademicSession,
  getAllAcademicSessions,
  getSingleAcademicSession,
  updateAcademicSession,
};
