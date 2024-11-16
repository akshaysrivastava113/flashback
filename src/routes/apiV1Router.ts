import { Router, Request, Response } from "express";

const router = Router();

router.post('/create', (req: Request, res: Response) => {
    //1. Accept token from the header
    //2. verify the token
    //3. Accept quest and answer from the body
    //4. slides.create
    //5. questionaire.create - utilise slides
    //6. user.update - use questionaire

    res.send("Home route");
});

router.post('/remove', (req: Request, res: Response) => {

});

export default router;