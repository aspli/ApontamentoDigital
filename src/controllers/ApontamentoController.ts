import { Request, Response } from "express"
import { apontamentoRepository } from "../repositories/apontamentoRepository"
import { userRepository } from "../repositories/userRepository"

export class ApontamentoController{

        async createApontamento(req: Request, res: Response){
            const { data_apt, total_horas, tarefa_realiza} = req.body
            const { idUser } = req.params
        
        try {
                const user = await userRepository.findOneBy({id_user: Number(idUser)})

                if(!user){
                    return res.status(404).json({message: 'Usuário não existe!'})
                }
                
                const newApontamento = apontamentoRepository.create({
                    data_apt, 
                    total_horas, 
                    tarefa_realiza,
                    user
                })
                    
                await apontamentoRepository.save(newApontamento)
        
                return res.status(201).json(newApontamento)
        
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error!'})
        
        }
    }

    async list(req: Request, res: Response) {
		try {
			const apontamentos = await apontamentoRepository.find({
                relations: {
                    user: true
                }
            })

			return res.json(apontamentos)
            
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}
}