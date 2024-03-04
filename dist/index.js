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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const connect_1 = __importDefault(require("./db/connect"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const timetables_1 = __importDefault(require("./routes/timetables"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const authentication_1 = __importDefault(require("./middleware/authentication"));
const admin_only_1 = __importDefault(require("./middleware/admin-only"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// in-built middleware
app.use(express_1.default.json());
// routers
app.use("/auth", auth_1.default);
app.use(authentication_1.default);
app.use("/timetables", timetables_1.default);
app.use(admin_only_1.default);
app.use("/users", users_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(not_found_1.default);
app.use(error_handler_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(process.env.MONGO_URI || "");
        console.log("Connected to database");
        app.listen(port || 3000, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (err) {
        console.log("Something went wrong");
    }
});
start();
