import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { ServicesRoutes } from '../modules/services/service.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/services',
    route: ServicesRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
