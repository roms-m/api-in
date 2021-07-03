import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
const bcript = require("bcrypt");

class AuthController{

    static register = async (req: Request, res: Response) =>{
        const { nombre, direccion, telefono, email, username, clave } = req.body;
        const user = new User();
        
        try {
            const salt = await bcript.genSalt(10);
            const hashedPass = await bcript.hash(clave, salt);
            const userRepository = getRepository(User);
            
            user.nombre = nombre;
            user.direccion = direccion;
            user.telefono = telefono;
            user.email = email;
            user.username = username;
            user.clave = hashedPass;

            const newUser = await userRepository.save(user);

            res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error)
        }


    }

    static login = async (req: Request, res: Response) => {

        const { username, clave} = req.body;
        
        if(!(username && clave)){
            res.status(404).json(
                { message: 'Nombre de usuario y contraseña son requeridos'}
            );
        }

        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail({
                where: {
                    username
                }
            })
        }catch{
            return res.status(404).json(
                { messaje: 'Nombre de usuario o clave incorrectos'}
            );
        }

        try {
            const validated = await bcript.compare(clave, user.clave);

            !validated && res.status(400).json("Datos incorrectos");
            
            res.status(200).json(user);
        } catch (error) {
            
        }

    }
}

export default AuthController;