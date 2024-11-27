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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const enums_1 = require("../constants/enums");
function userExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        let userExists;
        try {
            userExists = yield prisma.user.findUnique({
                where: {
                    email: email,
                }
            });
            console.log(userExists, "userExists");
        }
        catch (e) {
            console.error(e);
        }
        if (!userExists) {
            next();
        }
        else {
            return res.status(enums_1.HttpStatusCodeEnum.Conflict).send(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.Conflict]);
        }
    });
}
exports.default = userExists;
