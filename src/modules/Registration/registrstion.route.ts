import express from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { RegistrationController } from './registration.controller';

const router = express.Router();

router.post(
  '/create-registration',
  auth(UserRole.STUDENT),
  RegistrationController.createRegistration,
);

router.post(
  '/my-registration-info',
  auth(UserRole.STUDENT, UserRole.ADMIN),
  RegistrationController.getMyRegistrationInformation,
);

router.post(
  '/get-student-according-to-course',
  auth(UserRole.ADMIN),
  RegistrationController.getStudentByCourse,
);

router.get(
  '/not-approved-student',
  auth(UserRole.ADMIN),
  RegistrationController.getNotApprovedRegisteredStudent,
);

router.get(
  '/approved-student',
  auth(UserRole.ADMIN),
  RegistrationController.getApprovedRegisteredStudent,
);

export const RegistrationRoutes = router;
