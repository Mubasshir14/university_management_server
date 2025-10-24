import { Types } from 'mongoose';

export interface TAcademicDepartment  {
  name: string;
  image?: string;
  shortName: string;
  faculty?: Types.ObjectId[];
};
