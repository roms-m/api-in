import { Router } from 'express';
import IngresoController from '../controller/IngresoController';

const router = Router();

router.post('/', IngresoController.addIngreso);

router.get('/', IngresoController.getAllIngresos);

router.get('/:id', IngresoController.getIngresoById);

router.patch('/:id', IngresoController.editIngreso);

router.delete('/:id', IngresoController.deleteIngreso);

export default router;