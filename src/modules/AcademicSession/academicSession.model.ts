import { Schema, model } from 'mongoose';

import { TAcademicSession } from './academicSession.interface';
import {
  AcademicSessionCode,
  AcademicSessionName,
  Months,
} from './academicSession.constant';

const acdemicSessionSchema = new Schema<TAcademicSession>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSessionName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSessionCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

acdemicSessionSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSession.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('Semester is already exists !');
  }
  next();
});

export const AcademicSession = model<TAcademicSession>(
  'AcademicSession',
  acdemicSessionSchema,
);
