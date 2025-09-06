import express from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import { StudentController } from './student.controller';

const router = express.Router();

router.post(
  '/create-student',
  auth(UserRole.USER),
  multerUpload.single('image'),
  parseBody,
  //   validateRequest(studentValidations.createStudentValidationSchema),
  StudentController.createStudent,
);

router.patch(
  '/make-approval/:id',
  auth(UserRole.ADMIN),
  StudentController.makeApproval,
);

router.get('/', auth(UserRole.ADMIN), StudentController.getAllStudent);

router.get(
  '/single-student/:id',
  auth(UserRole.ADMIN),
  StudentController.getSingleStudent,
);

router.get(
  '/db',
  auth(UserRole.ADMIN),
  StudentController.dashboradDepBasedStudent,
);

router.get(
  '/sem',
  auth(UserRole.ADMIN),
  StudentController.dashboradSemBasedStudent,
);

router.get(
  '/not-approved-student',
  auth(UserRole.ADMIN),
  StudentController.getNotApprovedStudent,
);

router.get(
  '/approved-student',
  auth(UserRole.ADMIN),
  StudentController.getApprovedStudent,
);

router.get(
  '/get-me-as-a-student',
  auth(UserRole.STUDENT, UserRole.ADMIN),
  StudentController.getMeAsStudentData,
);

router.post(
  '/get-student-according-to-department',
  auth(UserRole.ADMIN),
  StudentController.getStudentByDepartment,
);

router.post(
  '/get-student-according-to-semester',
  auth(UserRole.ADMIN),
  StudentController.getStudentBySemester,
);

router.delete(
  '/delete-student/:id',
  auth(UserRole.ADMIN),
  StudentController.deleteStudent,
);

router.patch(
  '/update-student/:id',
  auth(UserRole.ADMIN),
  StudentController.updateImformationByAdmin,
);

export const StudentRoutes = router;
