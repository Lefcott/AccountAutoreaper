require('dotenv').config();

/** @typedef {object} Env
    @property {string} MONGODB_URL */
/** @type {Env}  */
module.exports = {};
module.exports.MONGODB_URL = process.env.MONGODB_URL;
