import { Router } from 'express';
import ArticuloController from '../controller/ArticuloController';

const router = Router();

router.post('/', ArticuloController.addArticulo);

router.get('/', ArticuloController.getAllArticulos);

router.get('/:id', ArticuloController.getArticuloById);

router.patch('/:id', ArticuloController.editArticulo);

router.delete('/:id', ArticuloController.deleteArticulo);

export default router;