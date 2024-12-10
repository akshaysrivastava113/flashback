import express from "express";
import dotenv from "dotenv";
import cron from 'node-cron';
import homeRouter from "./routes/homeRouter";
import userRouter from "./routes/userRouter";
import apiV1Router from "./routes/apiV1Router";
import authenticateRouter from "./routes/authenticateRouter";
import cors from "cors";
import {cleanup} from "./cron/cleanup";

const app = express();
app.use(cors());

app.use(express.json());
app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/auth', authenticateRouter);
app.use('/api/v1', apiV1Router);

const job = cron.schedule('*/60 * * * *', () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    console.log(`Ran cleanup! at: ${hours}:${minutes}:${seconds}`);
    cleanup();
  });

job.start();


dotenv.config();
const PORT: string | any = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT}`);
});