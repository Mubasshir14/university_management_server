import { UserRole } from '../User/user.interface';

export interface IAuth {
  [x: string]: unknown;
  email: string;
  password: string;
}

export interface IJwtPayload {
  userId: string;
  name: string;
  email: string;
  phone: string;
  student_id: string;
  role: UserRole;
  isActive: boolean;
}
