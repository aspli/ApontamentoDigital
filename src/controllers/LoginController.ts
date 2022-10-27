import { Request, Response } from "express";
import { BabRequestError, UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: number
}
 
export class LoginController{
    async login(req: Request, res: Response){
        const {login, senha } = req.body;
        const loginExists = await userRepository.findOneBy({login});

        if (!loginExists){            
            throw new BabRequestError('Login inválidos!');
        }
        const verifyPass = await bcrypt.compare(senha, loginExists.senha);
        if (!verifyPass){
            throw new BabRequestError('senha inválidos!');
        }

        const token = jwt.sign(
                                {id: loginExists.id_user}, 
                                process.env.JWT_PASS ?? '', 
                                {expiresIn: '8h'}
        );
        const {senha:_, ...userLogin } = loginExists;
        return res.json({
            user: userLogin.login,
            token: token
        });
        
    }   

    async getProfile(req:Request, res: Response){
        return res.json(req.user);
    }
}

