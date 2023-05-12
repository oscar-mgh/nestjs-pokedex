"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidationSchema = void 0;
const Joi = require("joi");
exports.JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3000),
    DEFAULT_LIMIT: Joi.number().default(10),
});
//# sourceMappingURL=joi.validationSchema.js.map