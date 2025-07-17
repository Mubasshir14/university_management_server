import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.userLogin);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.userLogout);
router.post(
  '/change-password',
  // auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.MEALPROVIDER),
  AuthController.changePassword,
);

export const AuthRoutes = router;
