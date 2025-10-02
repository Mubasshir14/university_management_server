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

export type TFaculty = {
  id: string;
  nid: string;
  designation: string;
  image?: string;
  name: string;
  gender: TGender;
  email: string;
  contactNo: string;
  bloodGroup: TBloodGroup;
  academicDepartment: Types.ObjectId;
};

export interface FacultyModel extends Model<TFaculty> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TFaculty | null>;
}
