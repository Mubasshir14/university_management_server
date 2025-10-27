import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export interface TStudent  {
  id: string;
  image?: string;
  firstName: string;
  lastName: string;
  name: string;
  gender: TGender;
  email: string;
  contactNo: string;
  bloodGroup: TBloodGroup;
  isApproved?: boolean;
  isRegistered?: boolean;
  user?: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicSession: Types.ObjectId;
  // academic semester
  year: string;
};

export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
}
