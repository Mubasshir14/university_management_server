import { z } from 'zod';
import { Gender } from './faculty.constant';

const allowedDomains = ['gmail.com', 'yahoo.com'];
const blockedDomains = [
  'spam.com',
  'temp.com',
  'tempmail.com',
  '10minutemail.com',
];

const emailSchema = z
  .string()
  .email('Invalid email format')
  .refine(
    (email) => {
      const domain = email.split('@')[1];
      return allowedDomains.includes(domain.toLowerCase());
    },
    { message: 'Only Gmail or Yahoo emails are allowed' },
  )
  .refine(
    (email) => {
      const domain = email.split('@')[1];
      return !blockedDomains.includes(domain.toLowerCase());
    },
    { message: 'Disposable or blocked email domains are not allowed' },
  );

const phoneSchema = z
  .string()
  .regex(
    /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
    'Invalid Bangladeshi phone number',
  );

const nidSchema = z
  .string()
  .regex(/^(?:\d{10}|\d{13}|\d{17})$/, 'NID must be 10, 13 or 17 digits');

const facultyIdSchema = z
  .string()
  .regex(/^F\d{6}$/, 'Faculty ID must start with "F" and followed by 6 digits');

export const createFacultyValidationSchema = z.object({
  body: z.object({
    id: facultyIdSchema,
    nid: nidSchema,
    designation: z.string(),
    name: z.string(),
    gender: z.enum([...Gender] as [string, ...string[]]),
    email: emailSchema,
    contactNo: phoneSchema,
    academicDepartment: z.string(),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
};
