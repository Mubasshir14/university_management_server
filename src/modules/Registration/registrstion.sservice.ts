/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Student } from '../Student/student.model';
import AppError from '../../app/errors/AppError';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
import { Course } from '../Course/course.model';
import { Registration } from './registration.model';
import { AcademicSession } from '../AcademicSession/academicSession.model';
import { sendCourseRegistrationApprovalEmail } from '../../app/utils/sendCourseRegistrationApprovalEmail';

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

  const academicSession = await AcademicSession.findById(
    payload.academicSession,
  );
  if (!academicSession) {
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
      academicSession: payload.academicSession,
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
    'student courses academicDepartment academicSession',
  );
  return result;
};

const getSingleRegistration = async (id: string) => {
  const result = await Registration.findOne({ _id: id }).populate(
    'courses student academicDepartment academicSession',
  );
  // academicDepartment academicSession student
  return result;
};

const getStudentByCourse = async (id: string) => {
  const result = await Registration.find({
    courses: { $in: [id] },
    // isApproved: true,
  }).populate('student courses academicDepartment academicSession');

  return result;
};

const getNotApprovedRegisteredStudent = async () => {
  const notApprovedStudents = await Registration.find({
    isApproved: false,
  }).populate('student courses academicDepartment academicSession');
  return notApprovedStudents;
};

const getApprovedRegisteredStudent = async () => {
  const notApprovedStudents = await Registration.find({
    isApproved: true,
  }).populate('student courses academicDepartment academicSession');
  return notApprovedStudents;
};


const makeRegistrationApproval = async (id: string) => {
  const registration = await Registration.findById(id)
    .populate('student', 'name email id year')
    .populate('courses', 'name credits')
    .populate('academicDepartment', 'name')
    .populate('academicSession', 'name year');

  if (!registration) {
    throw new AppError(httpStatus.NOT_FOUND, 'Registration not found');
  }

  const result = await Registration.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true },
  )
    .populate('student', 'name email id year')
    .populate('courses', 'name credits')
    .populate('academicDepartment', 'name')
    .populate('academicSession', 'name year');

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to approve course registration',
    );
  }

  const student = (result.student as any) || {};
  const courses = (result.courses as any[]) || [];
  const academicDepartment = (result.academicDepartment as any) || {};
  const academicSession = (result.academicSession as any) || {};

  const studentName = student.name || 'Unknown';
  const studentId = student.id || 'N/A';
  const semesterYear = student.year || 'N/A';
  const studentEmail = student.email || '';

  const departmentName = academicDepartment.name || 'Unknown Department';
  const sessionName = academicSession.name || 'Unknown Session';
  const sessionYear = academicSession.year || 'N/A';

  const courseDetails = courses.map((course) => ({
    name: course.name,
    credits: course.credits,
  }));

  await sendCourseRegistrationApprovalEmail(
    studentEmail,
    studentName,
    studentId,
    courseDetails,
    departmentName,
    sessionName,
    sessionYear,
    semesterYear,
  );

  return result;
};

const updateAndDropCourseByStudent = async (
  studentId: string,
  academicSessionId: string,
  academicDepartmentId: string,
  courseIdsToDrop: string[],
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const courseObjectIds = courseIdsToDrop.map(
      (courseId) => new mongoose.Types.ObjectId(courseId),
    );

    const registration = await Registration.findOne({
      student: studentId,
      academicSession: academicSessionId,
      academicDepartment: academicDepartmentId,
      isApproved: false,
    }).session(session);

    if (!registration) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Registration not found or already approved',
      );
    }

    const courseCreditAggregation = await Course.aggregate([
      {
        $match: {
          _id: { $in: courseObjectIds },
        },
      },
      {
        $group: {
          _id: null,
          totalCredit: { $sum: '$credits' },
        },
      },
    ]);

    const creditsToDrop = courseCreditAggregation[0]?.totalCredit || 0;

    const updatedRegistration = await Registration.updateOne(
      {
        _id: registration._id,
        isApproved: false,
      },
      {
        $pull: { courses: { $in: courseObjectIds } },
        $inc: { totalCredit: -creditsToDrop },
      },
      { session },
    );

    if (!updatedRegistration.modifiedCount) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update registration or registration already approved',
      );
    }

    const updatedReg = await Registration.findById(registration._id).session(
      session,
    );

    if (!updatedReg) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Updated registration not found',
      );
    }

    if (updatedReg.totalCredit < 9 || updatedReg.totalCredit > 15) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Remaining credit (${updatedReg.totalCredit}) must be between 9 and 15`,
      );
    }

    await session.commitTransaction();
    return updatedReg;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const updateAndDropCourseByAdmin = async (
  studentId: string,
  academicSessionId: string,
  academicDepartmentId: string,
  courseIdsToDrop: string[],
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const courseObjectIds = courseIdsToDrop.map(
      (courseId) => new mongoose.Types.ObjectId(courseId),
    );

    const registration = await Registration.findOne({
      student: studentId,
      academicSession: academicSessionId,
      academicDepartment: academicDepartmentId,
      isApproved: false,
    }).session(session);

    if (!registration) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Registration not found or already approved',
      );
    }

    const courseCreditAggregation = await Course.aggregate([
      {
        $match: {
          _id: { $in: courseObjectIds },
        },
      },
      {
        $group: {
          _id: null,
          totalCredit: { $sum: '$credits' },
        },
      },
    ]);

    const creditsToDrop = courseCreditAggregation[0]?.totalCredit || 0;

    const updatedRegistration = await Registration.updateOne(
      {
        _id: registration._id,
        isApproved: false,
      },
      {
        $pull: { courses: { $in: courseObjectIds } },
        $inc: { totalCredit: -creditsToDrop },
      },
      { session },
    );

    if (!updatedRegistration.modifiedCount) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update registration or registration already approved',
      );
    }

    const updatedReg = await Registration.findById(registration._id).session(
      session,
    );

    if (!updatedReg) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Updated registration not found',
      );
    }

    if (updatedReg.totalCredit < 9 || updatedReg.totalCredit > 15) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Remaining credit (${updatedReg.totalCredit}) must be between 9 and 15`,
      );
    }

    await session.commitTransaction();
    return updatedReg;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const RegistrationService = {
  createRegistration,
  getMyRegistrationInformation,
  getStudentByCourse,
  getNotApprovedRegisteredStudent,
  getApprovedRegisteredStudent,
  makeRegistrationApproval,
  updateAndDropCourseByStudent,
  updateAndDropCourseByAdmin,
  getSingleRegistration,
};
