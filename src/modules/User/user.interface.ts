/* eslint-disable no-unused-vars */
import { Date, Document, Model } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  ADVISOR = 'advisor',
  USER = 'user',
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  student_id: string;
  phone: string;
  nid: string;
  address: string;
  lastLogin: Date;
  isActive: boolean;
  isVerified: boolean;
  verificationToken?: string | null;
  verificationTokenExpires?: Date | null;
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
