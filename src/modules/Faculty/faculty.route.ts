import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { createFacultyValidationSchema } from './faculty.validation';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';

const router = express.Router();

router.post(
  '/create-faculty',
  auth(UserRole.ADMIN),
  multerUpload.single('image'),
  parseBody,
  validateRequest(createFacultyValidationSchema),
  FacultyControllers.createFaculty,
);

router.get(
  '/:id',
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.USER),
  FacultyControllers.getSingleFaculty,
);

router.patch('/:id', auth(UserRole.ADMIN), FacultyControllers.updateFaculty);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.USER),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
