/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TRegistration = {
  student: Types.ObjectId;
  student_id: string;
  isApproved?: boolean;
  totalCredit: number;
  courses: Types.ObjectId[];
  academicDepartment: Types.ObjectId;
  academicSemester: Types.ObjectId;
  isResultPublished: boolean;
};

export type RegistrationModel = Model<TRegistration, Record<string, unknown>> & {
  isUserExists(id: string): Promise<TRegistration | null>;
};