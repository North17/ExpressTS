"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthenticatedError("Authentication Invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
        // @ts-ignore
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        if (err instanceof Error && err.name === "TokenExpiredError") {
            throw new errors_1.UnauthenticatedError("Token expired");
        }
        throw new errors_1.UnauthenticatedError("Authentication Invalid");
    }
};
exports.default = authenticationMiddleware;
