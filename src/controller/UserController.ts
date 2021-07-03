import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {User} from "../entity/User";
const bcrypt = require('bcrypt');

export class UserController {

    static getAllUsers = async (req: Request, res: Response) => {

        let users;
        const userRepository = getRepository(User);

        try {
            
            users = await userRepository.find();

        } catch (error) {
            
            res.status(404).json({
                message: "Algo salio mal"
            });
        }

        if(users.length > 0){

            res.send(users);
        }else{
            res.status(404).json({

                message: "No se encontraron usuarios"
            });
        }
    }
    
   static getUserById = async( req: Request, res: Response) => {

    let { id } = req.params;
    const userRepository = getRepository(User);

    try {
        
        const user = await userRepository.findOneOrFail(id);
        
        res.send(user);

    } catch (error) {
        
        res.status(404).json({
            message: "No se encontraron resultados"
        })
    }
   }

   static editUser = async( req: Request, res: Response) => {
        
        const { id } = req.params;
        const { nombre, direccion, telefono, email, username, clave } = req.body;
        let user;

        const userRepository = getRepository(User);

        try {
            
            const salt = await bcrypt.genSalt(10);
            
            user = await userRepository.findOneOrFail(id);

            user.nombre = nombre;
            user.direccion = direccion;
            user.telefono = telefono;
            user.email = email;
            user.username = username;
            user.clave = await bcrypt.hash(clave, salt);

            
        } catch (error) {
            
            res.status(400).json({
                messaje: "Usuario no encontrado"
            })
        }

        try {
            
            await userRepository.save(user);

        } catch (error) {
            
            res.json(error);
        }

        res.status(201).json({
            message: "Usuario actualizado"
        })
   }

   static deleteUser = async( req: Request, res: Response) => {

        const { id } = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try {
            
            user = await userRepository.findOneOrFail(id)

        } catch (error) {
            
            res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        userRepository.delete(id);

        return res.status(201).json({
        
            message: "Usuario Eliminado"
        });
   }

}

export default UserController;