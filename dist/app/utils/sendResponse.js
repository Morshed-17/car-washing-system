"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, ResponseData) => {
    res.status(ResponseData.statusCode).json({
        success: ResponseData.success,
        statusCode: ResponseData.statusCode,
        message: ResponseData.message,
        data: ResponseData.data,
    });
};
exports.default = sendResponse;
