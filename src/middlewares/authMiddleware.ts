import { NextFunction, Request, Response } from "express";
import { BabRequestError, UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: number
}

export const authMiddleware =async (req:Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    if(!authorization){
        throw new UnauthorizedError('Não autorizado!');
    }
    const token = authorization.split(' ')[1];
    console.log(token);

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

    const user = await userRepository.findOneBy({ id_user: id });

    if (!user) {
        throw new BabRequestError('Não Autorizado!');
    }

    const {senha:_, ...loggedUser } = user;

    req.user = loggedUser;

    next();
    
}