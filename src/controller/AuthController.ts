import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
const bcript = require("bcript");

class AuthController{

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
            
        } catch (error) {
            
        }

    }
}