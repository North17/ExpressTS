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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json(users);
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userID } = req.params;
    const user = yield user_1.default.findOne({ _id: userID });
    if (!user) {
        throw new errors_1.NotFoundError(`No user found with ID: ${userID}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userID } = req.params;
    const user = yield user_1.default.findByIdAndUpdate({ _id: userID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new errors_1.NotFoundError(`No user found with ID: ${userID}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userID } = req.params;
    const user = yield user_1.default.findByIdAndDelete({ _id: userID });
    if (!user) {
        throw new errors_1.NotFoundError(`No user found with ID: ${userID}`);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: `Successfully deleted user with ID: ${userID}` });
});
exports.deleteUser = deleteUser;
