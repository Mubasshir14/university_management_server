import express from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { StudentIDController } from './studentid.controller';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.ADMIN),
  StudentIDController.createStudentID,
);

router.get('/', StudentIDController.getStudentID);
router.get('/:id', StudentIDController.getSingleStudentID);

router.delete(
  '/:id',
  auth(UserRole.ADMIN),
  StudentIDController.deleteStudentID,
);

export const StudentIDRoutes = router;
