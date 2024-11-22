import { Router, Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCodeEnum } from "../constants/enums";
const prisma = new PrismaClient();
const router = Router();

router.get('/dets', verifyToken, async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    console.log(userId);
    const alluserDets = await prisma.user.findUnique({
        select: {
            username: true,
            email: true,
            badges: true
          },
        where: {
            id: userId.id
        }
    });
    res.status(HttpStatusCodeEnum.OK).json(alluserDets);
});

router.get('/profile', verifyToken, async (req: Request, res: Response) => {
    const userId = (req as any).userId.id;
    const allQuestionairesOfUser = await prisma.questionaire.findMany({
        select: {
            id: true,
            title: true,
            authorId: true
          },
        where: {
            authorId: userId
        }
    });

    res.status(HttpStatusCodeEnum.OK).json(allQuestionairesOfUser);

});

export default router;