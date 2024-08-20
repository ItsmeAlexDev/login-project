import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";

declare module 'express' {
    export interface Request {
        user?: User;
    }
}

const authMiddleWare = async(req:Request, res:Response, next:NextFunction) => {
    //1. extract the token from header
    const token = req.headers.authorization!

    //2. if token is not present throw unauth error
    if(!token) next(new UnauthorizedException('Unauthorised entry!', ErrorCode.UNAUTHORIZED));

    try {
        //3. if token is present, verify that token and extract the payload
        const payload = jwt.verify(token, JWT_SECRET) as any;

        //4. get user from payload
        const user = await prismaClient.user.findFirst({where:{id: payload.userId}})
        if(!user) next(new UnauthorizedException('Unauthorised entry!', ErrorCode.UNAUTHORIZED));

        //5. attach the user to current request object
        req.user = user!;
        next();
        
    } catch (err) {
        next(new UnauthorizedException('Unauthorised entry!', ErrorCode.UNAUTHORIZED));   
    }
}

export default authMiddleWare