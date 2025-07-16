import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
   '/register',
   validateRequest(UserValidation.userValidationSchema),
   UserController.registerUser
);

export const UserRoutes = router;
