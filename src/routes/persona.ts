import { Router } from "express";
import PersonaCotroller from './../controller/PersonaController';

const router = Router();

router.post('/', PersonaCotroller.AddPersona);

router.get('/', PersonaCotroller.getAllPersonas);

router.get('/:id', PersonaCotroller.getPersonaById);

router.patch('/:id', PersonaCotroller.editPersona);

router.delete('/:id', PersonaCotroller.deleteUser);

export default router;