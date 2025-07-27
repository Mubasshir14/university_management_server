/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Student } from '../Student/student.model';
import AppError from '../../app/errors/AppError';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { Course } from '../Course/course.model';
import { Registration } from './registration.model';

const createRegistration = async (payload: any) => {
  const student = await Student.findById(payload.student);
  if (!student) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not found');
  }

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

  const courseIds = payload.courses.map(
    (courseId: string) => new mongoose.Types.ObjectId(courseId),
  );

  const courseCreditAggregation = await Course.aggregate([
    {
      $match: {
        _id: { $in: courseIds },
      },
    },
    {
      $group: {
        _id: null,
        totalCredit: { $sum: '$credits' },
      },
    },
  ]);
  const totalCredit = courseCreditAggregation[0]?.totalCredit || 0;

  if (totalCredit < 9 || totalCredit > 15) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Total credit (${totalCredit}) must be between 9 and 15`,
    );
  }

  payload.totalCredit = totalCredit;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingRegistration = await Registration.findOne({
      student: payload.student,
      academicDepartment: payload.academicDepartment,
      academicSemester: payload.academicSemester,
      courses: { $all: payload.courses, $size: payload.courses.length },
    });

    if (existingRegistration) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Duplicate registration: student is already registered with these courses in this semester',
      );
    }

    const newRegistration = await Registration.create([payload], { session });

    if (!newRegistration.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create registration',
      );
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      payload.student,
      {
        isRegistered: true,
      },
      { session, new: true },
    );

    if (!updatedStudent) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Student not found for status update',
      );
    }

    await session.commitTransaction();
    return newRegistration[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getMyRegistrationInformation = async (id: string) => {
  const result = await Registration.findOne({ student: id }).populate(
    'student courses academicDepartment academicSemester',
  );
  return result;
};

const getStudentByCourse = async (id: string) => {
  const result = await Registration.find({
    courses: { $in: [id] },
    // isApproved: true,
  }).populate('student courses academicDepartment academicSemester');

  return result;
};

const getNotApprovedRegisteredStudent = async () => {
  const notApprovedStudents = await Registration.find({
    isApproved: false,
  }).populate('student courses academicDepartment academicSemester');
  return notApprovedStudents;
};

const getApprovedRegisteredStudent = async () => {
  const notApprovedStudents = await Registration.find({
    isApproved: true,
  }).populate('student courses academicDepartment academicSemester');
  return notApprovedStudents;
};

export const RegistrationService = {
  createRegistration,
  getMyRegistrationInformation,
  getStudentByCourse,
  getNotApprovedRegisteredStudent,
  getApprovedRegisteredStudent,
};
