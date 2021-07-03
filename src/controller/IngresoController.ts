import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { DetalleIngreso } from '../entity/DetalleIngreso';
import { Ingreso } from '../entity/Ingreso';

class IngresoController{

    static addIngreso = async(req: Request, res: Response) => {

        const { total, personaId, userId, articuloId, cantidad, precio } = req.body;
        const ingreso = new Ingreso();
        const dIngreso = new DetalleIngreso();
        let idIngreso;

        try {

            const ingresoRepository = getRepository(Ingreso);
            
            ingreso.total = total;
            ingreso.persona = personaId;
            ingreso.user = userId;
            
            const newIngreso = await ingresoRepository.save(ingreso);

            idIngreso = newIngreso.id;

            res.status(201).json(newIngreso);
        } catch (error) {
            
            res.status(500).json({
                
                message: "Ocurrio un error",
                error: error
            });
        }

        try {
            
            const detalleIngresoRepository = getRepository(DetalleIngreso);
            
            dIngreso.ingreso = idIngreso;
            dIngreso.articulo = articuloId;
            dIngreso.catidad = cantidad;
            dIngreso.precio = precio;

            await detalleIngresoRepository.save(dIngreso);
        } catch (error) {
            
            res.status(500).json({
                
                message: "Ocurrio un error",
                error: error
            });
        }
    }

    static getAllIngresos = async(req: Request, res: Response) => {

        const ingresoRepository = getRepository(Ingreso);
        let ingresos;

        try {
            
            ingresos = await ingresoRepository.createQueryBuilder("ingreso")
            .leftJoinAndSelect("ingreso.persona","persona")
            .leftJoinAndSelect("ingreso.user", "user")
            .getMany();

            res.status(201).json(ingresos);
        } catch (error) {
            
            res.status(404).json({
                message: "Algo salió mal",
                error: error
            });
        }
    }

    static getIngresoById = async(req: Request, res: Response) => {

        const { id } = req.params;
        let ingreso;

        try {
            
            const ingresoRepository = getRepository(Ingreso);

            ingreso = await ingresoRepository.createQueryBuilder("ingreso")
                            .leftJoinAndSelect("ingreso.persona", "persona")
                            .leftJoinAndSelect("ingreso.user", "user")
                            .where("ingreso.id = :id",{ id: id})
                            .getMany();
            
            res.status(201).json(ingreso);
        } catch (error) {
            
            res.status(500).json({
                message: "Algo salió mal",
                error: error
            });
        }
    }

    static editIngreso = async(req: Request, res: Response) => {

        const { id } = req.params;
        const { total, personaId } = req.body;
        const ingresoRepository = getRepository(Ingreso);
        let ingreso;

        try {

            ingreso = await ingresoRepository.findOneOrFail(id);

            ingreso.total = total;
            ingreso.persona = personaId;
        } catch (error) {
            
            res.status(404).json({
                message: "No se encontró el ingreso"
            });
        }

        try {
            
            await ingresoRepository.save(ingreso);
        } catch (error) {
            
            res.status(500).json({
                message: "Algo salió mal"
            })
        }

        res.status(201).json({

            message: "Ingreso actualizado"
        })
    }

    static deleteIngreso = async( req: Request, res: Response) => {

        const { id } = req.params;
        const ingresoRepository = getRepository(Ingreso);
        let ingreso: Ingreso;

        try {
            
            ingreso = await ingresoRepository.findOneOrFail(id);
        } catch (error) {
         
            res.status(404).json({
                message: "No se encontró el ingreso"
            })
        }

        await ingresoRepository.delete(id);

        res.status(201).json({
            message: "Ingreso eliminado"
        });
    }
}

export default IngresoController;