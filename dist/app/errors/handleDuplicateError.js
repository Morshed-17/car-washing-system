"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const errorMessages = [
        {
            path: '',
            message: error.errorResponse.errmsg,
        },
    ];
    return {
        statusCode: 400,
        message: error.errorResponse.errmsg,
        errorMessages,
    };
};
exports.default = handleDuplicateError;
