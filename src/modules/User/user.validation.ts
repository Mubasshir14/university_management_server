import { z } from 'zod';
import { UserRole } from './user.interface';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: z.string().min(11, 'Phone is required'),
    address: z.string().min(5, 'Address is required'),
    role: z
      .enum([UserRole.STUDENT, UserRole.ADVISOR, UserRole.ADMIN, UserRole.USER])
      .default(UserRole.USER),
    isStudent: z.boolean().optional(), 
  }),
});


export const UserValidation = {
  userValidationSchema,
};
