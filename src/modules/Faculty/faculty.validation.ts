import { z } from 'zod';
import { Gender } from './faculty.constant';

export const createFacultyValidationSchema = z.object({
  body: z.object({
      designation: z.string(),
      name: z.string(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      email: z.string().email(),
      contactNo: z.string(),
      academicDepartment: z.string(),
  }),
});



export const studentValidations = {
  createFacultyValidationSchema,
};
