import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';

import loseValidationSchemas from './found-items.validation';
import loseControllers from './found-items.controller';
import authenticate from '../../middleware/auth.middleware';

const router = Router();
router.post(
  '/submit-found-item',
  validateRequest(loseValidationSchemas.foundItemValidationSchema),
  loseControllers.createFoundItem,
);
router.post(
  '/claim-found-item',
  authenticate('user'),
  validateRequest(loseValidationSchemas.claimValidationSchema),
  loseControllers.createClaim,
);
router.get(
  '/get-my-claims',
  authenticate('user'),

  loseControllers.getMyClaims,
);
router.get('/get-found-items', loseControllers.getAllFoundItem);
router.get(
  '/get-my-found-items',
  authenticate('user'),
  loseControllers.getMyFoundItems,
);

const FoundItemRoutes = router;

export default FoundItemRoutes;
