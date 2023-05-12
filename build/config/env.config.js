"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const envConfig = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 15,
});
exports.envConfig = envConfig;
//# sourceMappingURL=env.config.js.map