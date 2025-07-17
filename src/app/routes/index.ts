import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { UserRoutes } from '../../modules/User/user.route';
import { AcademicSemesterRoutes } from '../../modules/AcademicSemester/academicSemester.route';
import { FacultyRoutes } from '../../modules/Faculty/faculty.route';
import { AcademicDepartmentRoutes } from '../../modules/AcademicDepartment/academicDepartment.route';
import { CourseRoutes } from '../../modules/Course/course.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
