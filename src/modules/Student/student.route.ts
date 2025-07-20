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

export const StudentRoutes = router;
