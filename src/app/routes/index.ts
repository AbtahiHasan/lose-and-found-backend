import { Router } from 'express';

import AuthRoutes from '../modules/auth/auth.routes';
import LoseItemRoutes from '../modules/lost-items/lost-item.routes';
import FoundItemRoutes from '../modules/found-items/found-items.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/lose-item',
    route: LoseItemRoutes,
  },
  {
    path: '/found-item',
    route: FoundItemRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
