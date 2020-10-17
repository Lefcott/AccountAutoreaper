require('dotenv').config();

const { env } = process;
exports.DEBUG = env.DEBUG;
exports.NODE_ENV = env.NODE_ENV;
exports.MONGODB_URL = env.MONGODB_URL;
exports.ROLLBAR_ACCESS_TOKEN = env.ROLLBAR_ACCESS_TOKEN;
globalThis.env = exports;
