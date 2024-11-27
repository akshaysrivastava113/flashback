"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../constants/enums");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
function verifyToken(req, res, next) {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || "";
    if (!JWT_SECRET) {
        console.error(enums_1.HttpStatusCodeEnum.InternalServerError);
        return res.status(enums_1.HttpStatusCodeEnum.InternalServerError).send(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.InternalServerError]);
    }
    if (!token) {
        console.error(enums_1.HttpStatusCodeEnum.Unauthorized);
        return res.status(enums_1.HttpStatusCodeEnum.Unauthorized).send(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.Unauthorized]);
    }
    try {
        const isTokenValid = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = isTokenValid;
        next();
    }
    catch (e) {
        console.error(e);
        return res.status(enums_1.HttpStatusCodeEnum.Forbidden).send(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.Forbidden]);
    }
}
exports.default = verifyToken;
