/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../app/errors/AppError';
import { StudentID } from './studentid.model';

const createStudentID = async (data: any) => {
  const findstudentID = await StudentID.findOne({
    student_id: data.student_id,
  });

  if (findstudentID) {
    throw new AppError(500, 'Student ID already exist!');
  }

  const result = await StudentID.create(data);
  return result;
};

const getAllStudenID = async () => {
  const result = await StudentID.find();
  return result;
};

const getSingleStudentID = async (id: string) => {
  const result = await StudentID.find({ student_id: id });
  if (!result) {
    throw new AppError(404, 'Student ID is not found');
  }
  return result;
};

const deleteSingleStudentID = async (id: string) => {
  const result = await StudentID.deleteOne({ student_id: id });
  if (!result) {
    throw new AppError(404, 'Student ID is not found');
  }
  return result;
};

export const StudentIDService = {
  createStudentID,
  getAllStudenID,
  getSingleStudentID,
  deleteSingleStudentID,
};
