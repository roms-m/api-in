import { Router } from 'express';
import auth from './auth';
import user from './usuario';
import articulo from './articulo';

const routes = Router();

routes.use('/auth', auth);

routes.use('/users', user);

routes.use('/articulo', articulo);

export default routes;