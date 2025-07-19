import { z } from 'zod';

export const Gender = ['male', 'female', 'other'] as const;
export const BloodGroup = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

const createStudentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  image: z.string().url('Image must be a valid URL').optional(),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  name: z.string().min(1, 'Name is required'),
  gender: z.enum(Gender, { required_error: 'Gender is required' }),
  email: z.string().email('Invalid email address'),
  contactNo: z.string().min(1, 'Contact number is required'),
  bloodGroup: z
    .enum(BloodGroup, { required_error: 'Blood group is required' })
    .optional(),
  academicDepartment: z.string().min(1, 'Academic Department ID is required'),
  academicSemester: z.string().min(1, 'Academic Semester ID is required'),
});

export const studentValidations = {
  createStudentValidationSchema,
};
