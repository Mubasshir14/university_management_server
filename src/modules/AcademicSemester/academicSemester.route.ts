import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(UserRole.ADMIN),
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get(
  '/:courseId',
  auth(UserRole.ADMIN, UserRole.ADVISOR, UserRole.STUDENT, UserRole.STUDENT),
  AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:courseId',
  auth(UserRole.ADMIN),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.ADVISOR, UserRole.STUDENT, UserRole.USER),
  AcademicSemesterControllers.getAllAcademicSemesters,
);

export const AcademicSemesterRoutes = router;
