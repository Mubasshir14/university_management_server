/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import { generateStudentId } from './generateStudentId';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { Student } from './student.model';
import User from '../User/user.model';

const createStudentIntoDB = async (
  payload: TStudent,
  image: any,
  user: any,
): Promise<TStudent> => {
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic department not found');
  }

  const academicSemester = await AcademicSemester.findById(
    payload.academicSemester,
  );

  if (!academicSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic semester not found');
  }

  const existingEmail = await Student.findOne({ email: payload.email });
  if (existingEmail) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student with this email already exists',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const generatedId = await generateStudentId();
    payload.id = generatedId;
    payload.user = user.userId;

    if (image) {
      payload.image = image.path;
    }

    // Create student
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      {
        role: 'student',
      },
      { session, new: true },
    );

    if (!updatedUser) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'User not found for role update',
      );
    }

    await session.commitTransaction();
    return newStudent[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllStudent = async () => {
  const result = await Student.find({}).populate(
    'academicDepartment academicSemester',
  );
  return result;
};

const getNotApprovedStudent = async () => {
  const notApprovedStudents = await Student.find({
    isApproved: false,
  }).populate('academicDepartment academicSemester');
  return notApprovedStudents;
};

const getApprovedStudent = async () => {
  const notApprovedStudents = await Student.find({ isApproved: true }).populate(
    'academicDepartment academicSemester',
  );
  return notApprovedStudents;
};

const getMeAsStudentData = async (user: any) => {
  const student = await Student.findOne({
    user: new mongoose.Types.ObjectId(user.userId),
  }).populate('academicDepartment academicSemester');
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  return student;
};

const getStudentByDepartment = async (id: string) => {
  const students = await Student.find({
    academicDepartment: id,
    isApproved: true,
  }).populate('academicDepartment academicSemester');

  return students;
};

const getStudentBySemester = async (id: string) => {
  const students = await Student.find({
    academicSemester: id,
    isApproved: true,
  }).populate('academicDepartment academicSemester');

  return students;
};

const makeApproval = async (id: string) => {
  const student = await Student.findById(id);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const result = await Student.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true },
  );

  return result;
};

const dashboradDepBasedStudent = async () => {
  const result = await Student.aggregate([
    {
      $group: {
        _id: '$academicDepartment',
        totalStudents: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'academicdepartments',
        localField: '_id',
        foreignField: '_id',
        as: 'departmentInfo',
      },
    },
    { $unwind: '$departmentInfo' },
    {
      $project: {
        _id: 0,
        departmentId: '$_id',
        departmentName: '$departmentInfo.name',
        shortName: '$departmentInfo.shortName',
        totalStudents: 1,
      },
    },
  ]);
  return result;
};

const dashboradSemBasedStudent = async () => {
  const result = await Student.aggregate([
    {
      $group: {
        _id: '$academicSemester',
        totalStudents: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'academicsemesters',
        localField: '_id',
        foreignField: '_id',
        as: 'semesterInfo',
      },
    },
    { $unwind: '$semesterInfo' },
    {
      $project: {
        _id: 0,
        semesterId: '$_id',
        semesterName: '$semesterInfo.name',
        year: '$semesterInfo.year',
        code: '$semesterInfo.code',
        totalStudents: 1,
      },
    },
  ]);
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  makeApproval,
  getAllStudent,
  getNotApprovedStudent,
  getApprovedStudent,
  getMeAsStudentData,
  getStudentByDepartment,
  getStudentBySemester,
  dashboradDepBasedStudent,
  dashboradSemBasedStudent,
};
