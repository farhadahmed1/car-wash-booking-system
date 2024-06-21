import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ServicesRoutes } from '../modules/services/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServicesRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
