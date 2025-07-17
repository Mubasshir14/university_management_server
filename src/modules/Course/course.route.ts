import express from 'express';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { UserRole } from '../User/user.interface';

const router = express.Router();

router.post(
  '/create-course',
  auth(UserRole.ADMIN),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);

router.delete('/:id', auth(UserRole.ADMIN), CourseControllers.deleteCourse);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
