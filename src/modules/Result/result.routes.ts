import express from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { ResultController } from './result.controller';

const router = express.Router();

router.post(
  '/generate/:registrationId',
  auth(UserRole.ADMIN),
  ResultController.generateStudentResult,
);

export const ResultRoutes = router;
