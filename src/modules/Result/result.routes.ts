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

router.get('/', auth(UserRole.ADMIN), ResultController.getAllStudentResult);

router.post(
  '/my-result',
  auth(UserRole.STUDENT, UserRole.ADMIN),
  ResultController.getMyResult,
);

export const ResultRoutes = router;
