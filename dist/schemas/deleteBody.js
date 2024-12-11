"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBodySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.deleteBodySchema = zod_1.default.object({
    questionnaireId: zod_1.default.string(),
    userId: zod_1.default.string()
});
