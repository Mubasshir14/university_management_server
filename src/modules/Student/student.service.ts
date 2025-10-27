/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import { Student } from './student.model';
import User from '../User/user.model';
import { Registration } from '../Registration/registration.model';
import { AcademicSession } from '../AcademicSession/academicSession.model';
import config from '../../app/config';
import { sendStudentApprovalEmail } from '../../app/utils/sendStudentApprovalEmail';

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

  const academicSession = await AcademicSession.findById(
    payload.academicSession,
  );

  if (!academicSession) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic session not found');
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
    // const generatedId = await generateStudentId();
    payload.id = user.student_id;
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
    'academicDepartment academicSession',
  );
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ _id: id, isApproved: true }).populate(
    'academicDepartment academicSession',
  );
  return result;
};

const getNotApprovedStudent = async () => {
  const notApprovedStudents = await Student.find({
    isApproved: false,
  }).populate('academicDepartment academicSession');
  return notApprovedStudents;
};

const getApprovedStudent = async () => {
  const notApprovedStudents = await Student.find({ isApproved: true }).populate(
    'academicDepartment academicSession',
  );
  return notApprovedStudents;
};

const getMeAsStudentData = async (user: any) => {
  const student = await Student.findOne({
    user: new mongoose.Types.ObjectId(user.userId),
  }).populate('academicDepartment academicSession');
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  return student;
};

const getStudentByDepartment = async (id: string) => {
  const students = await Student.find({
    academicDepartment: id,
    isApproved: true,
  }).populate('academicDepartment academicSession');

  return students;
};

const getStudentBySession = async (id: string) => {
  const students = await Student.find({
    academicSession: id,
    isApproved: true,
  }).populate('academicDepartment academicSession');
  return students;
};

const getStudentBySemester = async (id: string) => {
  const students = await Student.find({
    year: id,
  }).populate('academicDepartment academicSession');

  return students;
};

const makeApproval = async (id: string) => {
  const student = await Student.findById(id)
    .populate('academicDepartment', 'name')
    .populate('academicSession', 'name year');

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const result = await Student.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to approve student');
  }

  const { email, academicDepartment, academicSession, year } = student;
  const departmentName =
    (academicDepartment as any)?.name || 'Unknown Department';
  const sessionName = (academicSession as any)?.name || 'Unknown Session';
  const sessionYear = (academicSession as any)?.year || 'N/A';
  const courseRegistrationLink = `${config.CLIENT_URL}/student/dashboard/registration`;

  try {
    await sendStudentApprovalEmail(
      email,
      courseRegistrationLink,
      departmentName,
      sessionName,
      sessionYear,
      year,
    );
  } catch (emailError) {
    console.error('Email sending failed, but approval completed:', emailError);
    throw emailError
  }

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

const dashboradSessionBasedStudent = async () => {
  const result = await Student.aggregate([
    {
      $group: {
        _id: '$academicSession',
        totalStudents: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'academicsessions',
        localField: '_id',
        foreignField: '_id',
        as: 'sessionInfo',
      },
    },
    { $unwind: '$sessionInfo' },
    {
      $project: {
        _id: 0,
        sessionId: '$_id',
        sessionName: '$sessionInfo.name',
        year: '$sessionInfo.year',
        code: '$sessionInfo.code',
        totalStudents: 1,
      },
    },
  ]);
  return result;
};

const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      const student = await Student.findById(id).session(session);
      if (!student) {
        throw new AppError(400, 'Student Not Found');
      }
      await Registration.findOneAndDelete({ student: id }).session(session);

      await User.findByIdAndDelete(id).session(session);
      const res = await Student.findByIdAndDelete(id).session(session);

      return res;
    });

    return result;
  } catch (error: any) {
    throw error instanceof AppError
      ? error
      : new AppError(500, 'Failed to delete student');
  } finally {
    session.endSession();
  }
};

const updateImformationByAdmin = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const student = await Student.findById({ _id: id });
  if (!student) {
    throw new AppError(400, 'Student Not FOund');
  }

  const result = await Student.findByIdAndUpdate(
    {
      _id: id,
    },
    { ...payload },
    { new: true, runValidators: true },
  );
  return result;
};


const makeManyApproval = async (ids: string[]) => {
  const approvedStudents: any[] = [];
  const failedStudents: any[] = [];

  for (const id of ids) {
    try {
      const student = await Student.findById(id)
        .populate('academicDepartment', 'name')
        .populate('academicSession', 'name year');

      if (!student) {
        console.warn(`Student with ID ${id} not found`);
        failedStudents.push({ id, reason: 'Student not found' });
        continue;
      }

      const result = await Student.findByIdAndUpdate(
        id,
        { isApproved: true },
        { new: true }
      );

      if (!result) {
        console.warn(`Failed to update student ID ${id}`);
        failedStudents.push({ id, reason: 'Failed to update' });
        continue;
      }

      const { email, academicDepartment, academicSession, year } = student;
      const departmentName = (academicDepartment as any)?.name || 'Unknown Department';
      const sessionName = (academicSession as any)?.name || 'Unknown Session';
      const sessionYear = (academicSession as any)?.year || 'N/A';
      const courseRegistrationLink = `${config.CLIENT_URL}/student/dashboard/registration`;

      try {
        await sendStudentApprovalEmail(
          email,
          courseRegistrationLink,
          departmentName,
          sessionName,
          sessionYear,
          year
        );
        approvedStudents.push(result);
      } catch (emailError) {
        console.error(`Email sending failed for student ID ${id}:`, emailError);
        failedStudents.push({ id, reason: 'Email sending failed' });
      }
    } catch (error) {
      console.error(`Error approving student ID ${id}:`, error);
    }
  }

  return {
    message: 'Batch approval completed',
    approvedCount: approvedStudents.length,
    failedCount: failedStudents.length,
    approvedStudents,
    failedStudents,
  };
};

export const StudentService = {
  createStudentIntoDB,
  makeApproval,
  makeManyApproval,
  getAllStudent,
  getSingleStudent,
  getNotApprovedStudent,
  getApprovedStudent,
  getMeAsStudentData,
  getStudentByDepartment,
  getStudentBySession,
  getStudentBySemester,
  dashboradDepBasedStudent,
  dashboradSessionBasedStudent,
  deleteStudent,
  updateImformationByAdmin,
};
