import { Course } from './course.model';
import { TCourse } from './course.interface';
import { Student } from '../Student/student.model';
import AppError from '../../app/errors/AppError';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find().populate('faculty').populate('offered_in');

  return result;
};
const getAllCoursesAccordingToStudentAcademicSemester = async (id: string) => {
  const student = await Student.findById(id);
  if (!student) {
    throw new AppError(500, 'Student is not found');
  }

  const result = await Course.find({
    offered_in: student.academicSemester,
  })
    .populate('faculty')
    .populate('offered_in');

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id)
    .populate('faculty')
    .populate('offered_in');

  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.deleteOne({_id:id});
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getAllCoursesAccordingToStudentAcademicSemester,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
