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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minLength: 3,
        maxLength: 20,
    },
    email: {
        type: String,
        required: [true, '"Please provide email'],
        unique: true,
        maxLength: 50,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        this.password = yield bcrypt_1.default.hash(this.password, salt);
    });
});
UserSchema.methods.createJWT = function () {
    if (process.env.JWT_SECRET)
        return jsonwebtoken_1.default.sign({
            userID: this._id,
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        });
};
UserSchema.methods.comparePasswords = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcrypt_1.default.compare(candidatePassword, this.password);
        return isMatch;
    });
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
