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
exports.register = exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = __importDefault(require("../models/user"));
const errors_1 = require("../errors");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        throw new errors_1.BadRequestError("Please provide email, name and password");
    }
    //   ? email
    const user = yield user_1.default.create(Object.assign(Object.assign({}, req.body), { isAdmin: false }));
    //   @ts-ignore
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        //   @ts-ignore
        // ? Maybe refactor isAdmin?
        user: { name: user.name, email: user.email, isAdmin: user.isAdmin },
        token,
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide email and password");
    }
    //   ? email check
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.BadRequestError("Please enter valid credentials");
    }
    //   @ts-ignore
    const isPasswordCorrect = yield user.comparePasswords(password);
    if (!isPasswordCorrect) {
        throw new errors_1.BadRequestError("Please enter valid credentials");
    }
    //   @ts-ignore
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        //   @ts-ignore
        user: { name: user.name, email: user.email, isAdmin: user.isAdmin },
        token,
    });
});
exports.login = login;
