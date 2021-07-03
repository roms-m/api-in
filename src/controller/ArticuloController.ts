import { Request, Response } from 'express';
import { Articulo } from '../entity/Articulo';
import { getRepository } from 'typeorm';

class ArticuloController{

    static addArticulo = async(req: Request, res: Response) => {

        const { codigo, nombre, precio_venta, stock, descripcion, imagen } = req.body;
        let articulo = new Articulo();
        
        try {
            
            const articuloRepository = getRepository(Articulo);

            articulo.codigo = codigo;
            articulo.nombre = nombre;
            articulo.precio_venta = precio_venta;
            articulo.stock = stock;
            articulo.descripcion = descripcion;
            articulo.imagen = imagen;

            const newArticulo = await articuloRepository.save(articulo);

            res.status(200).json(newArticulo);

        } catch (error) {
            
            return res.status(500).json(error);
        }
    }

    static getAllArticulos = async( req: Request, res: Response) => {

        const articuloRepository = getRepository(Articulo);
        let articulos;

        try {
            
            articulos = await articuloRepository.find();

        } catch (error) {
            
            res.json(error);
        }

        if(articulos.length > 0){

            res.status(200).json(articulos);
        }else{

            res.status(404).json({
                message: "No se encontraron articulos"
            });
        }
    }

    static getArticuloById = async(req: Request, res: Response) => {

        const { id } = req.params;
        const articuloRepository = getRepository(Articulo);

        try {
            
            const user = await articuloRepository.findOneOrFail(id);
            
            res.status(200).json(user);

        } catch (error) {
            
            res.status(404).json({
                message: "No se encontró el articulo"
            });
        }
    }

    static editArticulo = async(req: Request, res: Response) => {
        
        const { id } = req.params;
        const { codigo, nombre, precio_venta, stock, descripcion, imagen } = req.body;
        const articuloRepository = getRepository(Articulo);
        let articulo;
        

        try {
            
            articulo = await articuloRepository.findOneOrFail(id);

            articulo.codigo = codigo;
            articulo.nombre = nombre;
            articulo.precio_venta = precio_venta;
            articulo.stock = stock;
            articulo.descripcion = descripcion;
            articulo.imagen = imagen;

        } catch (error) {
            
            res.status(404).json({

                message: "No se encontró el articulo"
            })
        }

        try {
            
            await articuloRepository.save(articulo);
        } catch (error) {
            
            res.json(error);
        }

        res.status(200).json("Articulo editado");
    }

    static deleteArticulo = async( req: Request, res: Response) => {

        const { id } = req.params;
        const articuloRepository = getRepository(Articulo);
        let articulo: Articulo;
        
        try {
            
            articulo = await articuloRepository.findOneOrFail(id);

        } catch (error) {
            
            res.status(404).json({

                message: "Articulo no encontrado"
            });
        }

        await articuloRepository.delete(id);

        res.status(201).json({

            message: "Articulo Elimnado"
        });
    }
}

export default ArticuloController;