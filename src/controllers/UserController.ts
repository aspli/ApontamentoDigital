import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController{
    async create(req: Request, res: Response){
        const { nome, cargo, email, login, senha } = req.body

        try {
            const newUser = userRepository.create({nome, cargo, email, login, senha})
            
            await userRepository.save(newUser)

            return res.status(201).json(newUser)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error!'})
        }
    }

    async list(req: Request, res: Response) {
		try {
			const users = await userRepository.find({ })

			return res.json(users)
            
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}
    
} 