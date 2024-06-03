import { Router } from 'express';
import authControllers from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import userValidationSchemas from './auth.validation';
import authenticate from '../../middleware/auth.middleware';

const router = Router();
router.post(
  '/register',
  validateRequest(userValidationSchemas.userRegistrationValidationSchema),
  authControllers.createUser,
);
router.post(
  '/login',
  validateRequest(userValidationSchemas.userLoginValidationSchema),
  authControllers.login,
);
router.post(
  '/change-password',
  authenticate('user', 'admin'),
  validateRequest(userValidationSchemas.userChangePasswordValidationSchema),
  authControllers.changePassword,
);
const AuthRoutes = router;

export default AuthRoutes;
