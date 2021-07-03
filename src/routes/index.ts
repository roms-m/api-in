import { Router } from 'express';
import auth from './auth';
import user from './usuario';
import articulo from './articulo';
import persona from './persona';
import ingreso from './ingreso';
import venta from './venta';

const routes = Router();

routes.use('/auth', auth);

routes.use('/users', user);

routes.use('/articulo', articulo);

routes.use('/persona', persona);

routes.use('/ingreso', ingreso);

routes.use('/venta', venta);

export default routes;