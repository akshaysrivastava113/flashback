import { Router, Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { questionaireSchema } from "../schemas/slidesShema";
import { HttpStatusCodeEnum, HttpStatusMessages } from "../constants/enums";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/create', verifyToken , async (req: Request, res: Response): Promise<any> => {
    //1. Accept token from the header
    //2. verify the token
    //3. Accept quest and answer array from the body
    //4. questionaire.create - utilise user Id
    //5. slides.create
    //6. user.update - use questionaire
    const userId = (req as any).userId;

    const bodySanitized = questionaireSchema.safeParse(req.body);
    if(!bodySanitized.success){
        return res.status(HttpStatusCodeEnum.BadRequest).json(HttpStatusMessages[HttpStatusCodeEnum.BadRequest]);
    }

    const body = req.body;
    const slidesRec = body.slidesData;

    const randomQuestionaireUUID: string = uuidv4();

    const createQuestionaire = await prisma.questionaire.create({
        data:{
            id: randomQuestionaireUUID,
            title: body.questTitle,
            authorId: userId.id
        }
    });


    slidesRec.map(async (slideRec: any) => {
        const randomSlidesUUID: string = uuidv4();
        const createSlides = await prisma.slides.create({
            data:{
                id: randomSlidesUUID,
                position: slideRec.position,
                ask: slideRec.ask,
                answer: slideRec.answer,
                questionId: randomQuestionaireUUID
            }
        });
    })


    res.send("Created");
});

router.patch('/edit/:questionaireIdUrl', (req: Request, res: Response) => {
    //Get all the slides in relevance to the q id
    //Capture the new questionaire title, slides from the post
});

router.post('/remove', (req: Request, res: Response) => {

});

export default router;