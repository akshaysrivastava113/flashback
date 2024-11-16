import express from "express";
import dotenv from "dotenv";
import homeRouter from "./routes/homeRouter";
import userRouter from "./routes/userRouter";
import apiV1Router from "./routes/apiV1Router";
import authenticateRouter from "./routes/authenticateRouter";

const app = express();

app.use(express.json());
app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/auth', authenticateRouter);
app.use('/api/v1', apiV1Router);

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});