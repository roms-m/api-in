import { Router } from 'express';
import UserController from './../controller/UserController';

const router = Router();

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.put('/:id', UserController.editUser);

router.delete('/:id', UserController.deleteUser);

export default router;
