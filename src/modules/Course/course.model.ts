import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';

const courseSchema = new Schema<TCourse>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    shortName: {
      type: String,
      trim: true,
      required: true,
    },
    courseCode: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    faculty: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
      },
    ],
    offered_in: [
      {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSession',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', courseSchema);
