import { Schema, model } from 'mongoose';
import { StudentModel, TStudent } from './student.interface';
import { BloodGroup, Gender } from './student.constant';

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    image: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Department is required'],
      ref: 'AcademicDepartment',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Semester is required'],
      ref: 'AcademicSemester',
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

// Check if user already exists
studentSchema.statics.isUserExists = async function (id: string) {
  return await this.findOne({ id });
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
