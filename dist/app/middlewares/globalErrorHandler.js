"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went went';
    let errorMessages = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const response = (0, handleZodError_1.default)(err);
        statusCode = response.statusCode;
        message = response.message;
        errorMessages = response.errorMessages;
    }
    else if (err.name === 'ValidationError') {
        const response = (0, handleValidationError_1.default)(err);
        statusCode = response.statusCode;
        message = response.message;
        errorMessages = response.errorMessages;
    }
    else if (err.name === 'CastError') {
        const response = (0, handleCastError_1.default)(err);
        statusCode = response.statusCode;
        message = response.message;
        errorMessages = response.errorMessages;
    }
    else if (err.code === 11000) {
        const response = (0, handleDuplicateError_1.default)(err);
        statusCode = response.statusCode;
        message = response.message;
        errorMessages = response.errorMessages;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: err.stack,
    });
};
exports.default = globalErrorHandler;
