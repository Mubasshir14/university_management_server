import { Types } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  image?: string;
  shortName: string;
  faculty: Types.ObjectId[];
};
