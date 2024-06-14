"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorMessages = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorMessages,
    };
};
exports.default = handleCastError;
