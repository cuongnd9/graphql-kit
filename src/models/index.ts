import { Sequelize } from 'sequelize';
import { logger } from 'juno-js';

import { config } from '../components';

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: config.pgUser,
  password: config.pgPassword,
  database: config.pgDB,
  host: config.pgHost,
  port: config.pgPort,
  // eslint-disable-next-line no-console
  logging: config.nodeEnv === 'development' ? console.log : false,
  define: {
    underscored: true,
  },
});

sequelize
  .authenticate()
  .catch((e) => {
    logger.error('Sequelize authentication failed: ', e);
  });

export default sequelize;
