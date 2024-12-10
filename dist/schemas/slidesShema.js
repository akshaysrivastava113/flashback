"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionaireSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.questionaireSchema = zod_1.default.object({
    questTitle: zod_1.default.string(),
    slidesData: zod_1.default.array(zod_1.default.object({
        id: zod_1.default.number().optional(),
        ask: zod_1.default.string(),
        answer: zod_1.default.string(),
        position: zod_1.default.number()
    }))
});
