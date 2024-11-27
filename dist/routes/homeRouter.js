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
const enums_1 = require("../constants/enums");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allQuestionaires = yield prisma.questionaire.findMany({
        select: {
            id: true,
            title: true,
            authorId: true
        },
        where: {}
    });
    res.status(enums_1.HttpStatusCodeEnum.OK).json(allQuestionaires);
}));
router.get('/quest/:questionaireIdUrl', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionaireIdUrl = req.params.questionaireIdUrl;
    const allSlidesOfQ = yield prisma.slides.findMany({
        select: {
            id: true,
            ask: true,
            answer: true
        },
        where: {
            questionId: questionaireIdUrl
        },
        orderBy: {
            id: "asc"
        }
    });
    res.status(enums_1.HttpStatusCodeEnum.OK).json(allSlidesOfQ);
}));
exports.default = router;
