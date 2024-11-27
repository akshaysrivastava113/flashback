"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const homeRouter_1 = __importDefault(require("./routes/homeRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const apiV1Router_1 = __importDefault(require("./routes/apiV1Router"));
const authenticateRouter_1 = __importDefault(require("./routes/authenticateRouter"));
const cors_1 = __importDefault(require("cors"));
const cleanup_1 = require("./cron/cleanup");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', homeRouter_1.default);
app.use('/user', userRouter_1.default);
app.use('/auth', authenticateRouter_1.default);
app.use('/api/v1', apiV1Router_1.default);
const job = node_cron_1.default.schedule('*/2 * * * *', () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    console.log(`Ran cleanup! at: ${hours}:${minutes}:${seconds}`);
    (0, cleanup_1.cleanup)();
});
job.start();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT}`);
});
