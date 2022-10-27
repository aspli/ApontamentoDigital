import { Request, Response } from "express";
import { BabRequestError, UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';


export class UserController{
    async create(req: Request, res: Response){
        const { nome, cargo, email, login, senha } = req.body;

        const userExists = await userRepository.findOneBy({email});
        const loginExists = await userRepository.findOneBy({login});
        if (userExists || loginExists){
            throw new BabRequestError('E-mail ou login já existente!');
        }

        const hashPassword = await bcrypt.hash(senha, 10);
        const newUser = userRepository.create({
            nome, 
            cargo, 
            email, 
            login, 
            senha: hashPassword
        });            
        await userRepository.save(newUser);
        const { senha: _, ...user} = newUser;
        return res.status(201).json(user);
    }

    async list(req: Request, res: Response) {
        const users = await userRepository.find({ });
        return res.json(users);
	}    
}   