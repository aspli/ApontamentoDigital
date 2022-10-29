import { Request, Response } from "express"
import { BabRequestError } from "../helpers/api-erros";
import { apontamentoRepository } from "../repositories/apontamentoRepository"
import { userRepository } from "../repositories/userRepository"

export class ApontamentoController{
    
    async createApontamento(req: Request, res: Response){ 
        var loggedUser = req.user;            
        const { data_apt, hora_inicial, hora_final, tarefa_realizada} = req.body;     
        const user = await userRepository.findOneBy({id_user: loggedUser.id_user});

        if(!user){
            throw new BabRequestError("Usuário não existe!");        
        }

        let hInicial = hora_inicial;
        let hFinal = hora_final;
        let intervaloTempo = Number(hInicial.split(':')[0]) > Number(hFinal.split(':')[0])
                            && Number(hFinal.split(':')[1]) <= Number(hInicial.split(':')[1]);                            
        if(intervaloTempo){
            throw new BabRequestError("Intervalo de tempo inválido!"); 
        }

        let min = Number(hInicial.split(':')[1]) + Number(hFinal.split(':')[1]);
        let horas = Number(hFinal.split(':')[0]) - Number(hInicial.split(':')[0]);
        let total_minutos = min + horas*60;

        const newApontamento = apontamentoRepository.create({
            data_apt, 
            total_minutos, 
            tarefa_realizada,
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

    async relatorio(req: Request, res: Response) {
        const { data_inicial, data_final} = req.body; 
        if(!data_inicial || !data_final) {
            let mes = new Date().getMonth()+1;
            let ano = new Date().getFullYear();
            const apontamento = await apontamentoRepository
            .createQueryBuilder("apontamento")
            .where('apontamento.data_apt > :startDate', {startDate: `${ano}-${mes}-01`})
            .andWhere('apontamento.data_apt < :endDate', {endDate: `${ano}-${mes}-31`})
            .getMany();
            
            return res.json(apontamento);
        }
        const apontamento = await apontamentoRepository
        .createQueryBuilder("apontamento")
        .where('apontamento.data_apt > :startDate', {startDate: data_inicial})
        .andWhere('apontamento.data_apt < :endDate', {endDate: data_final})
        .getMany();

        return res.json(apontamento);
	}

    async delete(req: Request, res: Response) {
        const { id_apt } = req.body;
        const idExists = await apontamentoRepository.findOneBy({id_apt});
        if (!idExists){
            throw new BabRequestError('Id inválido!');
        }
        await apontamentoRepository.delete({id_apt});
        return res.json(idExists);
	}

}