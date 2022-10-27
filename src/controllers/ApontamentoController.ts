import { Request, Response } from "express"
import { BabRequestError } from "../helpers/api-erros";
import { apontamentoRepository } from "../repositories/apontamentoRepository"
import { userRepository } from "../repositories/userRepository"

export class ApontamentoController{

    async createApontamento(req: Request, res: Response){
        const { data_apt, total_horas, tarefa_realiza} = req.body;
        const { idUser } = req.params;        
        const user = await userRepository.findOneBy({id_user: Number(idUser)});

        if(!user){
            throw new BabRequestError("Usuário não existe!");        
        }

        const newApontamento = apontamentoRepository.create({
            data_apt, 
            total_horas, 
            tarefa_realiza,
            user
        });     
        await apontamentoRepository.save(newApontamento);    
        return res.status(201).json(newApontamento); 
    }

    async list(req: Request, res: Response) {
        const apontamentos = await apontamentoRepository.find({
            relations: {
                user: true
            }
        });
        return res.json(apontamentos);
	}
}