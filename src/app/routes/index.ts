import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { UserRoutes } from '../../modules/User/user.route';
import { AcademicSemesterRoutes } from '../../modules/AcademicSemester/academicSemester.route';
import { FacultyRoutes } from '../../modules/Faculty/faculty.route';
import { AcademicDepartmentRoutes } from '../../modules/AcademicDepartment/academicDepartment.route';
import { CourseRoutes } from '../../modules/Course/course.route';
import { StudentRoutes } from '../../modules/Student/student.route';
import { RegistrationRoutes } from '../../modules/Registration/registrstion.route';

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
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/registration',
    route: RegistrationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
