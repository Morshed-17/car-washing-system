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
exports.BookingServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const booking_model_1 = require("./booking.model");
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("../slot/slot.model");
const createBooking = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role });
    if (!userData) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Customer does not exists');
    }
    const serviceData = yield service_model_1.Service.findById(payload === null || payload === void 0 ? void 0 : payload.serviceId);
    if (!serviceData) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Service does not exists');
    }
    const slotData = yield slot_model_1.Slot.findOne({
        _id: payload === null || payload === void 0 ? void 0 : payload.slotId,
        service: payload === null || payload === void 0 ? void 0 : payload.serviceId,
    });
    if (!slotData) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Slot does not exists');
    }
    if ((slotData === null || slotData === void 0 ? void 0 : slotData.isBooked) === 'booked') {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'This slot is already booked');
    }
    yield slot_model_1.Slot.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.slotId, {
        isBooked: 'booked',
    });
    const booking = yield booking_model_1.Booking.create({
        customer: userData === null || userData === void 0 ? void 0 : userData._id,
        service: payload === null || payload === void 0 ? void 0 : payload.serviceId,
        slot: payload === null || payload === void 0 ? void 0 : payload.slotId,
        vehicleType: payload === null || payload === void 0 ? void 0 : payload.vehicleType,
        vehicleBrand: payload === null || payload === void 0 ? void 0 : payload.vehicleBrand,
        vehicleModel: payload === null || payload === void 0 ? void 0 : payload.vehicleModel,
        manufacturingYear: payload === null || payload === void 0 ? void 0 : payload.manufacturingYear,
        registrationPlate: payload === null || payload === void 0 ? void 0 : payload.registrationPlate,
    });
    const result = yield booking_model_1.Booking.findById(booking === null || booking === void 0 ? void 0 : booking._id)
        .populate('customer')
        .populate('service')
        .populate('slot');
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find()
        .populate('customer')
        .populate('service')
        .populate('slot');
    return result;
});
const getUserBooking = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role });
    const result = booking_model_1.Booking.find({ customer: userData === null || userData === void 0 ? void 0 : userData._id });
    return result;
});
exports.BookingServices = {
    createBooking,
    getUserBooking,
    getAllBookings,
};
