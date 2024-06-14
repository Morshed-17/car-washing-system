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
exports.SlotSlot = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("./slot.model");
const createSlot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(payload === null || payload === void 0 ? void 0 : payload.service);
    if (!service) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Service does not exists by this id');
    }
    const serviceDuration = service === null || service === void 0 ? void 0 : service.duration;
    const startTimeString = payload === null || payload === void 0 ? void 0 : payload.startTime;
    const endTimeString = payload === null || payload === void 0 ? void 0 : payload.endTime;
    const startTimeInMins = Number(startTimeString.split(':')[0]) * serviceDuration;
    const endTimeInMins = Number(endTimeString.split(':')[0]) * serviceDuration;
    const totalDuration = endTimeInMins - startTimeInMins;
    const numberOfSlots = totalDuration / serviceDuration;
    // generate slots
    const timeIntervals = [];
    for (let i = 0; i < numberOfSlots; i++) {
        const startTime = (Number(startTimeString.split(':')[0]) + i).toString() + ':00';
        const endTime = (Number(endTimeString.split(':')[0]) -
            (numberOfSlots - 1) +
            i).toString() + ':00';
        timeIntervals.push({ startTime, endTime });
    }
    const slots = timeIntervals.map((time) => {
        return {
            service: payload === null || payload === void 0 ? void 0 : payload.service,
            date: payload === null || payload === void 0 ? void 0 : payload.date,
            startTime: time.startTime,
            endTime: time.endTime,
        };
    });
    const result = yield slot_model_1.Slot.create(slots);
    return result;
});
const getAvailableSlots = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = {};
    if (query === null || query === void 0 ? void 0 : query.date) {
        queryObj.date = query.date;
    }
    if (query === null || query === void 0 ? void 0 : query.serviceId) {
        queryObj.service = query.serviceId;
    }
    const result = yield slot_model_1.Slot.find(queryObj);
    return result;
});
exports.SlotSlot = {
    createSlot,
    getAvailableSlots,
};
