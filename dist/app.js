"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const NotFound_1 = __importDefault(require("./app/errors/NotFound"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.json({
        message: 'Wellcome to Car Wash Backend',
    });
});
app.use('/api', routes_1.default);
app.use(globalErrorHandler_1.default);
app.all('*', NotFound_1.default);
exports.default = app;
