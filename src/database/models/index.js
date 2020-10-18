const { getResolvers } = require('../resolvers');
const { account } = require('./account');

globalThis.Account = getResolvers(account);
