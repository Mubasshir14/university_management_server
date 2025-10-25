import { z } from 'zod';
import { UserRole } from './user.interface';

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

const studentIdSchema = z
  .string()
  .regex(/^\d{6}$/, 'Student ID must be exactly 6 digits');

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: emailSchema,
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: phoneSchema,
    address: z.string().min(5, 'Address is required'),
    nid: nidSchema,
    student_id: studentIdSchema,
    role: z
      .enum([UserRole.STUDENT, UserRole.ADVISOR, UserRole.ADMIN, UserRole.USER])
      .default(UserRole.USER),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
