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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cleanup = () => __awaiter(void 0, void 0, void 0, function* () {
    //DELETE SLIDES
    //Get all the slides from the db
    //filter down the ones that begin with '[TEST]'
    //Delete all
    //DELETE QUESTIONAIRES
    //Run after the first promise is resolved, DELETE QUESTIONAIRES
    //Get all the questionaires form the db
    //filter down the ones that begin with '[TEST]'
    //Delete all
    const allSlides = yield prisma.slides.findMany({
        select: {
            id: true,
            ask: true
        }
    });
    const slidesToDel = [];
    const slidesToDelIds = [];
    allSlides.map((item) => {
        if ((item.ask).includes('[TEST]')) {
            slidesToDel.push(item);
            slidesToDelIds.push(item.id);
        }
    });
    if (slidesToDelIds.length > 0) {
        const delSlides = yield prisma.slides.deleteMany({
            where: {
                id: {
                    in: slidesToDelIds
                }
            }
        });
        console.log("delSlides", delSlides);
    }
    else {
        console.log("No slides to delete", slidesToDel);
    }
    setTimeout(() => {
        console.log("Waited for 5s for the slides to be deleted");
    }, 5000);
    const allQuestionaires = yield prisma.questionaire.findMany({
        select: {
            id: true,
            title: true
        }
    });
    const questsToDel = [];
    const questsToDelIds = [];
    allQuestionaires.map((item) => {
        if (item && item.title && (item.title).includes('[TEST]')) {
            questsToDel.push(item);
            questsToDelIds.push(item.id);
        }
    });
    if (questsToDelIds.length > 0) {
        const delQuests = yield prisma.questionaire.deleteMany({
            where: {
                id: {
                    in: questsToDelIds
                }
            }
        });
        console.log("delQuests", delQuests);
    }
    else {
        console.log("No quests to delete!", questsToDel);
    }
});
exports.cleanup = cleanup;
