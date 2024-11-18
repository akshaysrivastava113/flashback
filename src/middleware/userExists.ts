import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { HttpStatusCodeEnum, HttpStatusMessages } from "../constants/enums";

async function userExists(req: Request,res: Response, next: any): Promise<any> {
    
    const email: string = req.body.email;

    let userExists: any;
    try {
        userExists = await prisma.user.findUnique({
            where: {
              email: email,
            }
        });
    
        console.log(userExists,"userExists");
    } catch(e) {
        console.error(e);
    }

    if(!userExists) {
        next();
    } else {
        return res.status(HttpStatusCodeEnum.Conflict).send(HttpStatusMessages[HttpStatusCodeEnum.Conflict]);
    }
}

export default userExists;