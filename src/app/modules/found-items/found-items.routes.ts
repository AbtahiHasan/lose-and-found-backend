import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';

import loseValidationSchemas from './found-items.validation';
import foundControllers from './found-items.controller';
import authenticate from '../../middleware/auth.middleware';

const router = Router();
router.post(
  '/submit-found-item',
  authenticate('user'),
  validateRequest(loseValidationSchemas.foundItemValidationSchema),
  foundControllers.createFoundItem,
);
router.post(
  '/claim-found-item',
  authenticate('user'),
  validateRequest(loseValidationSchemas.claimValidationSchema),
  foundControllers.createClaim,
);
router.get(
  '/get-my-claims',
  authenticate('user'),

  foundControllers.getMyClaims,
);
router.get('/get-found-items', foundControllers.getAllFoundItem);
router.get(
  '/get-my-found-items',
  authenticate('user'),
  foundControllers.getMyFoundItems,
);
router.put(
  '/update-status',
  authenticate('user'),
  foundControllers.updateStatus,
);
router.delete('/:id', authenticate('user'), foundControllers.deleteFoundItem);

const FoundItemRoutes = router;

export default FoundItemRoutes;
