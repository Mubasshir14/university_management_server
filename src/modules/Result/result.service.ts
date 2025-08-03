/* eslint-disable @typescript-eslint/no-explicit-any */

import { Registration } from '../Registration/registration.model';
import { TCourseMarks, TStudentResult } from './result.iterface';
import StudentResult from './result.model';
import { calculateGradeAndPoints } from './result.utils';

// const generateStudentResult = async (registrationId: string) => {
//   const registration = await Registration.findById(registrationId)
//     .populate('student')
//     .populate('courses');

//   if (!registration) {
//     throw new Error('Registration not found');
//   }

//   const courseMarks: TCourseMarks[] = registration.courses.map(
//     (course: any) => {
//       const mid1 = course.midTerm1 || 0;
//       const mid2 = course.midTerm2 || 0;
//       const final = course.finalTerm || 0;
//       return {
//         courseId: course._id,
//         midTerm1: mid1,
//         midTerm2: mid2,
//         finalTerm: final,
//         total: mid1 + mid2 + final,
//       };
//     },
//   );

//   const totalMarks = courseMarks.reduce(
//     (acc, curr) => acc + (curr.total || 0),
//     0,
//   );
//   const averageMarks =
//     courseMarks.length > 0 ? totalMarks / courseMarks.length : 0;

//   const { grade: avgGrade, gradePoints: avgGradePoints } =
//     calculateGradeAndPoints(averageMarks);

//   const existingResult = await StudentResult.findOne({
//     registration: registration._id,
//   });

//   if (existingResult) {
//     existingResult.coursesMarks = courseMarks;
//     existingResult.averageMarks = averageMarks;
//     existingResult.avgGrade = avgGrade as any;
//     existingResult.avgGradePoints = avgGradePoints;
//     await existingResult.save();
//     return existingResult;
//   }

//   const studentResult: TStudentResult = {
//     registration: registration._id,
//     student: registration.student,
//     coursesMarks: courseMarks,
//     averageMarks,
//     avgGrade: avgGrade as any,
//     avgGradePoints,
//   };

//  await Registration.findByIdAndUpdate(
//     registrationId,
//     { isResultPublished: true },
//     { new: true }
//   );

//   const result = await StudentResult.create(studentResult);
//   return result;
// };

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
export const ResultService = {
  generateStudentResult,
};
