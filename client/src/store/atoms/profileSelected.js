"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileSelected = void 0;
const recoil_1 = require("recoil");
exports.profileSelected = (0, recoil_1.atom)({
    key: 'profileSelected', // unique ID
    default: false, // default value
});
