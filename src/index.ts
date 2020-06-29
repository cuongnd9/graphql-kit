import path from 'path';
import { migrateDB, logger } from './components';
import sequelize from './models';
import { associate } from './models/association';
import app from './app';

const main = async () => {
  try {
    const pathToMigration = path.join(__dirname, 'migrations');
    await migrateDB(sequelize, pathToMigration);
    associate();
    app()
  } catch (error) {
    logger().error(error, 'Global error: ');
  }
};

main();
