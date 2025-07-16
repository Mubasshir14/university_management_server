import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import auth from '../../app/middlewares/auth';
import { UserRole } from '../User/user.interface';
import validateRequest from '../../app/middlewares/validateRequest';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth(UserRole.ADMIN),
   multerUpload.single('image'),
  parseBody,
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartmemt,
);

router.get(
  '/:departmentId',
  auth(UserRole.ADMIN),
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  auth(UserRole.ADMIN),
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDeartment,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.ADVISOR, UserRole.STUDENT, UserRole.STUDENT),
  AcademicDepartmentControllers.getAllAcademicDepartments,
);

export const AcademicDepartmentRoutes = router;
