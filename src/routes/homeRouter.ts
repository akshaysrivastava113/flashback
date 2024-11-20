import { Router, Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCodeEnum } from "../constants/enums";
const prisma = new PrismaClient();

const router = Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
    const allQuestionaires = await prisma.questionaire.findMany({
        select: {
            id: true,
            title: true,
            authorId: true
          },
        where: {}
    });
    res.status(HttpStatusCodeEnum.OK).json(allQuestionaires);
});

router.get('/quest/:questionaireIdUrl', verifyToken, async (req: Request, res: Response) => {
    const questionaireIdUrl = req.params.questionaireIdUrl;
    console.log(questionaireIdUrl);
    const allSlidesOfQ = await prisma.slides.findMany({
        select: {
            id: true,
            ask: true,
            answer: true
          },
        where: {
            questionId: questionaireIdUrl
        }
    });
    res.status(HttpStatusCodeEnum.OK).json(allSlidesOfQ);
});

export default router;