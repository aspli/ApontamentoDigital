import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController{
    async create(req: Request, res: Response){
        const { nome, cargo, email, login, senha } = req.body;
        const newUser = userRepository.create({nome, cargo, email, login, senha});            
        await userRepository.save(newUser);
        return res.status(201).json(newUser);
    }

    async list(req: Request, res: Response) {
        const users = await userRepository.find({ });
        return res.json(users);
	}
    
} 