/* eslint-disable @typescript-eslint/no-explicit-any */

import { Registration } from '../Registration/registration.model';
import { TCourseMarks, TStudentResult } from './result.iterface';
import StudentResult from './result.model';
import { calculateGradeAndPoints } from './result.utils';

const generateStudentResult = async (
  registrationId: string,
  courseMarks: TCourseMarks[],
) => {
  const registration = await Registration.findById(registrationId)
    .populate('student')
    .populate('courses');

  if (!registration) {
    throw new Error('Registration not found');
  }

  const updatedCourseMarks = courseMarks.map((mark) => ({
    courseId: mark.courseId,
    midTerm1: mark.midTerm1 || 0,
    midTerm2: mark.midTerm2 || 0,
    finalTerm: mark.finalTerm || 0,
    total: (mark.midTerm1 || 0) + (mark.midTerm2 || 0) + (mark.finalTerm || 0),
  }));

  const totalMarks = updatedCourseMarks.reduce(
    (acc, curr) => acc + (curr.total || 0),
    0,
  );
  const averageMarks =
    updatedCourseMarks.length > 0 ? totalMarks / updatedCourseMarks.length : 0;

  const { grade: avgGrade, gradePoints: avgGradePoints } =
    calculateGradeAndPoints(averageMarks);

  const existingResult = await StudentResult.findOne({
    registration: registration._id,
  });

  if (existingResult) {
    existingResult.coursesMarks = updatedCourseMarks;
    existingResult.averageMarks = averageMarks;
    existingResult.avgGrade = avgGrade as any;
    existingResult.avgGradePoints = avgGradePoints;
    await existingResult.save();
    return existingResult;
  }

  const studentResult: TStudentResult = {
    registration: registration._id,
    student: registration.student,
    coursesMarks: updatedCourseMarks,
    averageMarks,
    avgGrade: avgGrade as any,
    avgGradePoints,
  };

  await Registration.findByIdAndUpdate(
    registrationId,
    { isResultPublished: true },
    { new: true },
  );

  const result = await StudentResult.create(studentResult);
  return result;
};

// const getAllStudentResult = async () => {
//   const result = await StudentResult.find().populate('student registration');
//   return result;
// };

// const getMyResult = async (id: string) => {
//   const result = await StudentResult.findOne({ student: id }).populate(
//     'student registration',
//   );
//   return result;
// };

const getMyResult = async (id: string) => {
  const result = await StudentResult.findOne({ student: id }).populate([
    {
      path: 'student',
    },
    {
      path: 'registration',
      populate: [{ path: 'academicDepartment' }, { path: 'academicSession' }],
    },
    {
      path: 'coursesMarks.courseId',
      select: 'name courseCode credits', 
    },
  ]);
  return result;
};

const getAllStudentResult = async () => {
  const result = await StudentResult.find().populate([
    {
      path: 'student',
    },
    {
      path: 'registration',
      populate: [{ path: 'academicDepartment' }, { path: 'academicSession' }],
    },
    {
      path: 'coursesMarks.courseId',
      select: 'name courseCode credits',
    },
  ]);
  return result;
};

export const ResultService = {
  generateStudentResult,
  getAllStudentResult,
  getMyResult,
};
