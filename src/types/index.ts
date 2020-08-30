import { Resolvers as PureResolvers } from './graphql.type';
import { Models } from '../models';

export type Resolvers = PureResolvers<{models: Models}>;
