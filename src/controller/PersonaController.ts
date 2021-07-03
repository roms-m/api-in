import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Persona } from './../entity/Persona';

class PersonaController {

    static AddPersona = async(req: Request, res: Response) => {

        const { tipo_persona, nombre, direccion, telefono, email } = req.body;
        let persona = new Persona();
        
        try {
            
            const personaRepository = getRepository(Persona);

            persona.tipo_persona = tipo_persona;
            persona.nombre = nombre;
            persona.direccion = direccion;
            persona.telefono = telefono;
            persona.email = email;

            const newPersona = await personaRepository.save(persona);

            res.status(200).json(newPersona);

        } catch (error) {
            
            res.json(error);
        }
    }

    static getAllPersonas = async(req: Request, res: Response) => {

        const personaRepository = getRepository(Persona);
        let personas;

        try {

            personas = await personaRepository.find();

        } catch (error) {
            
            res.json(error);
        }

        if(personas.length > 0){

            res.status(201).json(personas);
        }else{

            res.status(404).json({
                
                message: "No se encontaron personas"
            });
        }
    }

    static getPersonaById = async(req: Request, res: Response) => {

        const { id } = req.params;
        const personaRepository = getRepository(Persona);
        let persona;

        try {
            
            persona = await personaRepository.findOneOrFail(id);

            res.status(201).json(persona);
        } catch (error) {
            
            res.status(404).json({
                
                message: "No se encontró registro de la persona"
            })
        }
    }

    static editPersona = async( req: Request, res: Response) => {

        const { id } = req.params;
        const { tipo_persona, nombre, direccion, telefono, email } = req.body;
        const personaRepository = getRepository(Persona);
        let persona;

        try {

            persona = await personaRepository.findOneOrFail(id);

            persona.tipo_persona = tipo_persona;
            persona.nombre = nombre;
            persona.direccion = direccion;
            persona.telefono = telefono;
            persona.email = email;

        } catch (error) {
            
            res.status(404).json({
                message: "No se encontro a la persona"
            })
        }

        try {
            
            await personaRepository.save(persona);
        } catch (error) {
         
            res.json(error);
        }

        res.status(201).json({

            message: "Persona actualizada"
        });
    }

    static deleteUser = async(req: Request, res: Response) => {

        const { id } = req.params;
        const personaRepository = getRepository(Persona);
        let persona: Persona;

        try {
            
            persona = await personaRepository.findOneOrFail(id);
        } catch (error) {
            
            res.status(404).json({

                message: "Persona no encontrada"
            });
        }

        await personaRepository.delete(id);

        res.status(201).json({

            message: "Persona eliminada"
        });
    }
}

export default PersonaController;