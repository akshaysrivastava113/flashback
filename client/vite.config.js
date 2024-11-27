"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: '0.0.0.0', // Listen on all network interfaces
        port: 5173, // Optional: specify the port (default is 5173)
    },
});
