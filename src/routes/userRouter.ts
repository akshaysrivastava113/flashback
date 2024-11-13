import { Router, Request, Response } from "express";
import { userSchema } from "../schemas/userSchema";
const router = Router();

router.get('/profile', (req: Request, res: Response) => {

    res.send("Profile");
});

export default router;