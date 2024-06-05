import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';

import loseValidationSchemas from './lost-item.validation';
import loseControllers from './lost-item.controller';

const router = Router();
router.post(
  '/submit-lose-item',
  validateRequest(loseValidationSchemas.loseItemValidationSchema),
  loseControllers.createLoseItem,
);
router.get('/get-lose-items', loseControllers.getAllLoseItem);

const LoseItemRoutes = router;

export default LoseItemRoutes;
