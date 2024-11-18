import { Router, Request, Response } from "express";
import { userSchema } from "../schemas/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpStatusCodeEnum, HttpStatusMessages } from "../constants/enums";
import userExists from "../middleware/userExists";
require('dotenv').config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || "";

router.post('/signup', userExists, async (req: Request, res: Response): Promise<any> => {

    console.log("JWT_SECRET",JWT_SECRET);
    console.log(req.body);

    //1. check if the user already exists - middleware
    //1. receive username, password and email - santiize throough zod
    //2. hash the password
    //3. create new user using prisma and hashed password
    //4. generate jwt token using the id and email
    //5. respond back with the token

    //1. DONE receive username, password and email - santiize throiough zod
    const reqValid = userSchema.safeParse(req.body);
    console.log(reqValid);
    
    if(!reqValid.success){
        return res.status(HttpStatusCodeEnum.BadRequest).json(HttpStatusMessages[HttpStatusCodeEnum.BadRequest]);
    }

    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    
    // Generate a random UUID
    const randomUserUUID: string = uuidv4();

    //3. DONE hash the password

    const hashedPassword = await bcrypt.hash(password, 10);


    //4. DONE create new user using prisma and hashed password

    const createUser  = await prisma.user.create({
        data:{
            id: randomUserUUID,
            username: username,
            email: email,
            password: hashedPassword,
            badges: ""
        }
    });

    //5. DONE generate jwt token using the id, username and email
    const token = jwt.sign({
        id: randomUserUUID,
        email: email
    }, JWT_SECRET);

    console.log(createUser);

    //6. DONE respond back with the token
    res.status(HttpStatusCodeEnum.OK).json({
        token: token
    });

});

router.post('/signin', async (req: Request, res: Response): Promise<any> => {
    //1. Do the zod validation for the inputs
    //2. Use email to find if the user exits
    //3. Send back token if they do, else send error message
    
    const reqValid = userSchema.safeParse(req.body);

    if(!reqValid.success){
        return res.status(HttpStatusCodeEnum.BadRequest).send(HttpStatusMessages[HttpStatusCodeEnum.BadRequest]);
    }

    const email: string = req.body.email;
    const password: string = req.body.password;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const foundUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(!foundUser){
        return res.status(HttpStatusCodeEnum.NotFound).send(HttpStatusMessages[HttpStatusCodeEnum.NotFound]);
    }

    const userHashed = foundUser?.password;
    const userUuid = foundUser?.id;
    const isValidUser = await bcrypt.compare(password, userHashed);

    if(!isValidUser){
        return res.status(HttpStatusCodeEnum.Forbidden).send(HttpStatusMessages[HttpStatusCodeEnum.Forbidden]);
    }

    const token = jwt.sign({
        id: userUuid,
        email: email
    }, JWT_SECRET);

    res.status(HttpStatusCodeEnum.OK).json({
        token: token
    });

    });



export default router;