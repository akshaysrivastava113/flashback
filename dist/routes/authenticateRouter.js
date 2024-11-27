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
const userSchema_1 = require("../schemas/userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const enums_1 = require("../constants/enums");
const userExists_1 = __importDefault(require("../middleware/userExists"));
require('dotenv').config();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const uuid_1 = require("uuid");
const JWT_SECRET = process.env.JWT_SECRET || "";
router.post('/signup', userExists_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //1. check if the user already exists - middleware
    //1. receive username, password and email - santiize throough zod
    //2. hash the password
    //3. create new user using prisma and hashed password
    //4. generate jwt token using the id and email
    //5. respond back with the token
    //1. DONE receive username, password and email - santiize throiough zod
    const reqValid = userSchema_1.userSchema.safeParse(req.body);
    if (!reqValid.success) {
        return res.status(enums_1.HttpStatusCodeEnum.BadRequest).json(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.BadRequest]);
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // Generate a random UUID
    const randomUserUUID = (0, uuid_1.v4)();
    //3. DONE hash the password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //4. DONE create new user using prisma and hashed password
    const createUser = yield prisma.user.create({
        data: {
            id: randomUserUUID,
            username: username,
            email: email,
            password: hashedPassword,
            badges: ""
        }
    });
    //5. DONE generate jwt token using the id, username and email
    const token = jsonwebtoken_1.default.sign({
        id: randomUserUUID,
        email: email
    }, JWT_SECRET);
    //6. DONE respond back with the token
    res.status(enums_1.HttpStatusCodeEnum.OK).json({
        token: token
    });
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //1. Do the zod validation for the inputs
    //2. Use email to find if the user exits
    //3. Send back token if they do, else send error message
    const reqValid = userSchema_1.userSchema.safeParse(req.body);
    if (!reqValid.success) {
        return res.status(enums_1.HttpStatusCodeEnum.BadRequest).send(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.BadRequest]);
    }
    const email = req.body.email;
    const password = req.body.password;
    // const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = yield prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!foundUser) {
        return res.status(enums_1.HttpStatusCodeEnum.NotFound).send(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.NotFound]);
    }
    const userHashed = foundUser === null || foundUser === void 0 ? void 0 : foundUser.password;
    const userUuid = foundUser === null || foundUser === void 0 ? void 0 : foundUser.id;
    const isValidUser = yield bcrypt_1.default.compare(password, userHashed);
    if (!isValidUser) {
        return res.status(enums_1.HttpStatusCodeEnum.Forbidden).send(enums_1.HttpStatusMessages[enums_1.HttpStatusCodeEnum.Forbidden]);
    }
    const token = jsonwebtoken_1.default.sign({
        id: userUuid,
        email: email
    }, JWT_SECRET);
    res.status(enums_1.HttpStatusCodeEnum.OK).json({
        token: token
    });
}));
exports.default = router;
