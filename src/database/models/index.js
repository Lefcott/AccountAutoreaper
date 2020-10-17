import { getResolvers } from '../resolvers';

import { account } from './account';

globalThis.Account = getResolvers(account);
