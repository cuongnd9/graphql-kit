import path from 'path';
import { logger, globalOptions } from 'juno-js';

import { migrateDB, config } from './components';
import sequelize from './models';
import { associate } from './models/association';
import app from './app';

globalOptions.environment = config.nodeEnv;

const main = async () => {
  try {
    const pathToMigration = path.join(__dirname, 'migrations');
    await migrateDB(sequelize, pathToMigration).catch((error) => logger.error('Migrate error', error));
    associate();
    app();
  } catch (error) {
    logger.error('Global error', error);
  }
};

main();
