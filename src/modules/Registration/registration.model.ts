import { Schema, model } from 'mongoose';
import { RegistrationModel, TRegistration } from './registration.interface';

const registrationSchema = new Schema<TRegistration, RegistrationModel>(
  {
    student: {
      type: Schema.Types.ObjectId,
      required: [true, 'Student is required'],
      ref: 'Student',
    },
    student_id: {
      type: String,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        required: [true, 'Courses is required'],
        ref: 'Course',
      },
    ],
    totalCredit: {
      type: Number,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Department is required'],
      ref: 'AcademicDepartment',
    },
    academicSession: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Semester is required'],
      ref: 'AcademicSession',
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isResultPublished: {
      type: Boolean,
      default: false,
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
registrationSchema.statics.isUserExists = async function (id: string) {
  return await this.findOne({ id });
};

export const Registration = model<TRegistration, RegistrationModel>(
  'Registration',
  registrationSchema,
);
