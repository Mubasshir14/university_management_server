import { UserRole } from '../User/user.interface';

export interface IAuth {
  email: string;
  password: string;
}

export interface IJwtPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}
