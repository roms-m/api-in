import { getRepository } from "typeorm";
import { json, Request, Response } from 'express';
import { Venta } from "../entity/Venta";
import { DetalleVenta } from "../entity/DetalleVenta";

class VentaController{

    static addVenta = async( req: Request, res: Response) => {

        const { ventaId, personaId, userId, articuloId, cantidad, precio } = req.body;
        const ventam = new Venta();
        const dVenta = new DetalleVenta();
        let ida: any;
        let newVenta;
        
        try {
            
            const ventaRepository = getRepository(Venta);
            //DATOS DE LA TABLA VENTA
            ventam.persona = personaId;
            ventam.user = userId;
            
            newVenta = await ventaRepository.save(ventam);

            ida = newVenta.id;
        } catch (error) {
            
            res.status(500).json({
                
                message: "Algo salió mal",
                error: error
            })
        }
        
        try {
            
            const detalleRepository = getRepository(DetalleVenta);
            //SE AGREGAN LOS DATOS A LA TABLA DETALLE VENTA
            console.log(ida);
            dVenta.venta = ida;
            dVenta.articulo = articuloId;
            dVenta.cantidad = cantidad;
            dVenta.precio = precio;
            
            //SE GUARDAN LOS DATOS
            await detalleRepository.save(dVenta);
        } catch (error) {
            
            res.status(500).json({
                
                message: "Algo salió mal",
                error: error
            });   
        }

        res.status(201).json(newVenta);
    }

    static getAllVentas = async(req: Request, res: Response) => {

        const ventaRepository = getRepository(Venta);
        let ventas;

        try {
            
            ventas = await ventaRepository.createQueryBuilder("venta")
                        .leftJoinAndSelect("venta.persona", "persona")
                        .leftJoinAndSelect("venta.user", "user")
                        .getMany();
            
            res.status(201).json(ventas);
        } catch (error) {
            
            res.status(404).json({

                message: "Algo salió mal",
                error: error
            });
        }
    }

    static getVentaById = async(req: Request, res: Response) => {

        const { id } = req.params;
        let venta;

        try {
            const ventaRepository = getRepository(Venta);

            venta = await ventaRepository.createQueryBuilder("venta")
                            .leftJoinAndSelect("venta.persona", "persona")
                            .leftJoinAndSelect("venta.user", "user")
                            .where("venta.id = :id", { id: id})
                            .getMany();
            
            if(venta){
            
                res.status(201).json(venta);
            }else{
            
                res.status(404).json({
            
                    messaje: "No se encontró la venta"
                });
            }
        
        } catch (error) {
        
            res.json(error);
        }
    }

    static deleteVenta = async(req: Request, res: Response) => {

        const { id } = req.params;
        const ventaRepository = getRepository(Venta);
        let venta: Venta;

        try {
            
            venta = await ventaRepository.findOneOrFail(id);

        } catch (error) {
            
            res.json(error);
        }

        await ventaRepository.delete(id);

        res.status(201).json({
            
            message: "Venta eliminado"
        });
    }

}

export default VentaController;