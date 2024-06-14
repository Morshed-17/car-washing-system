"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes2 = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("../booking/booking.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('user'), booking_controller_1.BookingControllers.getUserBooking);
exports.BookingRoutes2 = router;
