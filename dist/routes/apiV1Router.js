"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const slidesShema_1 = require("../schemas/slidesShema");
const enums_1 = require("../constants/enums");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.post('/create', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //1. Accept token from the header
    //2. verify the token
    //3. Accept quest and answer array from the body
    //4. questionaire.create - utilise user Id
    //5. slides.create
    //6. user.update - use questionaire
    const userId = req.userId;
    const bodySanitized = slidesShema_1.questionaireSchema.safeParse(req.body);
    if (!bodySanitized.success) {
        return res.status(enums_1.HttpStatusCodeEnum.BadRequest).json(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.BadRequest]);
    }
    const body = req.body;
    const slidesRec = body.slidesData;
    const randomQuestionaireUUID = (0, uuid_1.v4)();
    const createQuestionaire = yield prisma.questionaire.create({
        data: {
            id: randomQuestionaireUUID,
            title: body.questTitle,
            authorId: userId.id
        }
    });
    slidesRec.map((slideRec) => __awaiter(void 0, void 0, void 0, function* () {
        const randomSlidesUUID = (0, uuid_1.v4)();
        const createSlides = yield prisma.slides.create({
            data: {
                id: randomSlidesUUID,
                position: slideRec.id,
                ask: slideRec.ask,
                answer: slideRec.answer,
                questionId: randomQuestionaireUUID
            }
        });
    }));
    res.send("Created");
}));
router.post('/remove', (req, res) => {
});
exports.default = router;
