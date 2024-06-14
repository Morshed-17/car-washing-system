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
exports.ServiceServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("./service.model");
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = service_model_1.Service.create(payload);
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = service_model_1.Service.findById(id);
    return result;
});
const getAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.find();
    return result;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id);
    if (!service) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Service Not Found by this id');
    }
    const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(id, {
        isDeleted: true,
    }, { new: true });
    return result;
});
exports.ServiceServices = {
    createService,
    getSingleService,
    getAllService,
    updateService,
    deleteService,
};
