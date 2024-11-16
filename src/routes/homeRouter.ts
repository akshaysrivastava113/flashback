import { Router, Request, Response } from "express";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.send("Home route");
    
});

router.get('/:cardtype', (req: Request, res: Response) => {
    const cardType = req.params.cardtype;
    console.log(cardType);
});

export default router;