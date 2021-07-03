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

}

export default ArticuloController;