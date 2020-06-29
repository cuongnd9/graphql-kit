import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { logger, formatError, config } from './components';

const app = () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    formatError,
  });

  server.listen(config.port).then(({ url }) => {
    logger().info(`🚀 Server ready at ${url}`);
  });
};

export default app;
