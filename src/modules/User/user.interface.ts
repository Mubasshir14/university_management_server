/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  ADVISOR = 'advisor',
  USER = 'user'
}

export interface IUser extends Document {
  email: string;
  password: string;
  image?: string;
  name: string;
  role: UserRole;
  student_id: string;
  phone: string;
  nid: string;
  address: string;
  isStudent: boolean;
  lastLogin: Date;
  isActive: boolean;
  otpToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(id: string): Promise<IUser>;
  checkUserExist(userId: string): Promise<IUser>;
}
