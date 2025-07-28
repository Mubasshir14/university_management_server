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

router.patch(
  '/make-approval/:id',
  auth(UserRole.ADMIN),
  RegistrationController.makeRegistrationApproval,
);

router.get(
  '/not-approved-registration',
  auth(UserRole.ADMIN),
  RegistrationController.getNotApprovedRegisteredStudent,
);

router.get(
  '/approved-registration',
  auth(UserRole.ADMIN),
  RegistrationController.getApprovedRegisteredStudent,
);

router.get(
  '/:id',
  auth(UserRole.ADMIN, UserRole.STUDENT),
  RegistrationController.getSingleRegistration,
);

router.patch(
  '/drop-and-update-course-by-student',
  auth(UserRole.STUDENT),
  RegistrationController.updateAndDropCourseByStudent,
);

router.patch(
  '/drop-and-update-course-by-admin/:id',
  auth(UserRole.ADMIN),
  RegistrationController.updateAndDropCourseByAdmin,
);

export const RegistrationRoutes = router;
