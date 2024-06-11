import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
