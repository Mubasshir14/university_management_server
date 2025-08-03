import mongoose, { Schema } from 'mongoose';
import { TCourseMarks, TStudentResult } from './result.iterface';
import { Grade } from './result.constant';

const courseMarksSchema = new Schema<TCourseMarks>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    midTerm1: { type: Number, min: 0, max: 20, default: 0 },
    midTerm2: { type: Number, min: 0, max: 20, default: 0 },
    finalTerm: { type: Number, min: 0, max: 60, default: 0 },
    total: { type: Number, default: 0 },
  },
  { _id: false },
);

const studentResultSchema = new Schema<TStudentResult>(
  {
    registration: {
      type: Schema.Types.ObjectId,
      ref: 'Registration',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    coursesMarks: {
      type: [courseMarksSchema],
      default: [],
    },
    averageMarks: {
      type: Number,
      default: 0,
    },
    avgGrade: {
      type: String,
      enum: Grade,
      default: 'NA',
    },
    avgGradePoints: {
      type: Number,
      min: 0,
      max: 4,
      default: 0,
    },
  },
  { timestamps: true },
);

const StudentResult = mongoose.model<TStudentResult>(
  'StudentResult',
  studentResultSchema,
);

export default StudentResult;
