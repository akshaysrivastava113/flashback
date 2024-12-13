import { Router, Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { PrismaClient } from "@prisma/client";
import { HttpStatusCodeEnum } from "../constants/enums";
const prisma = new PrismaClient();

const router = Router();

router.get('/test', (req: Request, res: Response) => {
    console.log("Server running");
    res.status(HttpStatusCodeEnum.OK).json({
        "msg": "Server running"
    });
});

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
    const questTitle = await prisma.questionaire.findFirst({
        select: {
            title: true,
        },
        where: {
            id: questionaireIdUrl
        }
    });

    const allSlidesOfQ = await prisma.slides.findMany({
        select: {
            id: true,
            ask: true,
            answer: true,
            position: true
          },
        where: {
            questionId: questionaireIdUrl
        },
        orderBy: {
            position: "asc"
        }
    });
    const objToSend = {
        title: questTitle,
        slides: allSlidesOfQ
    };

    console.log(allSlidesOfQ);
    res.status(HttpStatusCodeEnum.OK).json(objToSend);
});

export default router;