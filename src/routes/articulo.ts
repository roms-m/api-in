import { Router } from 'express';
import ArticuloController from '../controller/ArticuloController';

const router = Router();

router.post('/', ArticuloController.addArticulo);

export default router;