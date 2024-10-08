import {NextFunction, Request, Response} from 'express';
import { prismaClient } from '..';
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { UnprocessableEntity } from '../exceptions/validation';
import { SignUpSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';
import { InternalException } from '../exceptions/internal-exception';

export const signup = async (req:Request, res:Response, next:NextFunction) => {
    SignUpSchema.parse(req.body)
    const {email, password, name} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})
    if (user) throw new BadRequestsException('User Already Exists!', ErrorCode.USER_ALREADY_EXISTS);
    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}

export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})

    if (!user) throw new NotFoundException('User Not Found!', ErrorCode.USER_NOT_FOUND)
    if (!compareSync(password, user.password)) throw new BadRequestsException('Password or Email are not correct!', ErrorCode.INCORRECT_PASSWORD)
        
    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET);
    
    res.json({user, token})
}

//me -> return logged user account

export const me = async (req:Request, res:Response) => {
    res.json(req.user)
}