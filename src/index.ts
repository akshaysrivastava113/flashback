import express from "express";
import dotenv from "dotenv";
import homeRouter from "./routes/homeRouter";
import userRouter from "./routes/userRouter";
import apiV1Router from "./routes/apiV1Router";
import authenticateRouter from "./routes/authenticateRouter";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/auth', authenticateRouter);
app.use('/api/v1', apiV1Router);

dotenv.config();
const PORT: string | any = process.env.PORT || 3000;

app.listen(PORT,  () => {
    console.log(`Listening on ${PORT}`);
});