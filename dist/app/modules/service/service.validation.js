"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidations = void 0;
const zod_1 = require("zod");
const createServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
        price: zod_1.z.number({ required_error: 'Price is required' }),
        duration: zod_1.z.number({ required_error: 'Duration Number is required' }),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        description: zod_1.z
            .string({ required_error: 'Description is required' })
            .optional(),
        price: zod_1.z.number({ required_error: 'Price is required' }).optional(),
        duration: zod_1.z
            .number({ required_error: 'Duration Number is required' })
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ServiceValidations = {
    createServiceValidationSchema,
    updateServiceValidationSchema,
};
