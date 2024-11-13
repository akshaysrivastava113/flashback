import { Router, Request, Response } from "express";
import { userSchema } from "../schemas/userSchema";
const router = Router();

router.post('/signup', (req: Request, res: Response) => {
    const reqValid = userSchema.safeParse(req);
    console.log(reqValid);
    res.send("Profile");
});

export default router;