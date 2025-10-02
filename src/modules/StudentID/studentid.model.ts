import { Schema, model } from 'mongoose';
import { TStudentID } from './studentid.interface';

const studentidSchema = new Schema<TStudentID>(
  {
    student_id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

export const StudentID = model<TStudentID>('StudentID', studentidSchema);
