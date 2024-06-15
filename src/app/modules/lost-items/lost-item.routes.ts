import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';

import loseValidationSchemas from './lost-item.validation';
import loseControllers from './lost-item.controller';
import authenticate from '../../middleware/auth.middleware';

const router = Router();
router.post(
  '/submit-lose-item',
  authenticate('user'),
  validateRequest(loseValidationSchemas.loseItemValidationSchema),
  loseControllers.createLoseItem,
);
router.get('/get-lose-items', loseControllers.getAllLoseItem);
router.get(
  '/get-my-lose-items',
  authenticate('user'),
  loseControllers.getMyLoseItems,
);

const LoseItemRoutes = router;

export default LoseItemRoutes;
