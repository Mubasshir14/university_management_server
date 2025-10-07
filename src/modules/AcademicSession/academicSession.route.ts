import express from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicSessionValidations } from './academicSession.validation';
import { AcademicSessionControllers } from './academicSession.controller';

const router = express.Router();

router.post(
  '/create-academic-session',
  auth(UserRole.ADMIN),
  validateRequest(
    AcademicSessionValidations.createAcdemicSessionValidationSchema,
  ),
  AcademicSessionControllers.createAcademicSession,
);

router.get(
  '/:courseId',
  auth(UserRole.ADMIN, UserRole.ADVISOR, UserRole.STUDENT, UserRole.STUDENT),
  AcademicSessionControllers.getSingleAcademicSession,
);

router.patch(
  '/:courseId',
  auth(UserRole.ADMIN),
  validateRequest(
    AcademicSessionValidations.updateAcademicSessionValidationSchema,
  ),
  AcademicSessionControllers.updateAcademicSession,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.ADVISOR, UserRole.STUDENT, UserRole.USER),
  AcademicSessionControllers.getAllAcademicSessions,
);

export const AcademicSessionRoutes = router;
