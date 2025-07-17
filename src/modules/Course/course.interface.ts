import { Types } from 'mongoose';


export type TCourse = {
  name: string;
  shortName: string;
  courseCode: string;
  credits: number;
  offered_in: [Types.ObjectId];
  faculty: [Types.ObjectId];
  isDeleted?: boolean;
};

