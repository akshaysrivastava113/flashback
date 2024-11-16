import { Router, Request, Response } from "express";
const router = Router();

router.get('/profile', (req: Request, res: Response) => {

    res.send("Profile");
});

export default router;