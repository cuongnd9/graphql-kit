import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { logger } from 'juno-js';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { models } from './models';
import { formatError, config } from './components';

const app = () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    context: (ctx) => ({
      ...ctx,
      models,
    }),
    formatError,
  });

  server
    .listen(config.port)
    .then(({ url }) => logger.info(`🚀 Server ready at ${url}`))
    .catch((error) => logger.error('Apollo Server error', error));
};

export default app;
