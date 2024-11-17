import { NextFunction, Request, Response } from "express";
import { HttpStatusCodeEnum, HttpStatusMessages } from "../constants/enums";
import jwt from "jsonwebtoken";
require('dotenv').config();

function verifyToken(req:Request, res:Response, next:NextFunction): any {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || "";

    if (!JWT_SECRET) {
        console.error(HttpStatusCodeEnum.InternalServerError);
        return res.status(HttpStatusCodeEnum.InternalServerError).send(HttpStatusMessages[HttpStatusCodeEnum.InternalServerError]);
    }

    if (!token) {
        console.error(HttpStatusCodeEnum.Unauthorized);
        return res.status(HttpStatusCodeEnum.Unauthorized).send(HttpStatusMessages[HttpStatusCodeEnum.Unauthorized]);
    }

    try{
        const isTokenValid = jwt.verify(token, JWT_SECRET);
        (req as any).userId = isTokenValid;
        next();
    } catch(e){
        console.error(e);
        return res.status(HttpStatusCodeEnum.Forbidden).send(HttpStatusMessages[HttpStatusCodeEnum.Forbidden]);
    }
}


export default verifyToken;