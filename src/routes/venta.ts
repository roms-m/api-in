import { Router } from "express";
import VentaController from "../controller/VentaController";

const router = Router();

router.post('/', VentaController.addVenta);

router.get('/', VentaController.getAllVentas);

router.get('/:id', VentaController.getVentaById);

router.delete('/:id', VentaController.deleteVenta);

export default router;