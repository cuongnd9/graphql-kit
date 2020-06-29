import path from 'path';

import { migrateDB, logger } from './components';
import sequelize from './models';
import { associate } from './models/association';
import app from './app';

const main = async () => {
  try {
    const pathToMigration = path.join(__dirname, 'migrations');
    await migrateDB(sequelize, pathToMigration).catch((error) => logger().error('Migrate error', error));
    associate();
    app();
  } catch (error) {
    logger().error('Global error', error);
  }
};

main();
