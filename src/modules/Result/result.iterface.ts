import { Types } from 'mongoose';

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';

export interface TCourseMarks  {
  courseId: Types.ObjectId;
  midTerm1: number;
  midTerm2: number;
  finalTerm: number;
  total?: number;
};

export interface TStudentResult  {
  registration: Types.ObjectId;
  student: Types.ObjectId;
  coursesMarks: TCourseMarks[];
  averageMarks: number;
  avgGrade: TGrade;
  avgGradePoints: number;
};
