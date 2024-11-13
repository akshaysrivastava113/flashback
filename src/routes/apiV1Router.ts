import { Router, Request, Response } from "express";

const router = Router();

router.post('/create', (req: Request, res: Response) => {
    res.send("Home route");
});

router.post('/remove', (req: Request, res: Response) => {

});

export default router;