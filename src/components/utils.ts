import { get } from 'lodash';
import Umzug from 'umzug';
import { Sequelize, BaseError, ValidationError } from 'sequelize';
import { GraphQLError } from 'graphql';

import {
  AppError,
  DatabaseError,
  DatabaseValidationError,
} from './errors';

export const formatError = (error: GraphQLError) => {
  let formattedError;
  const originalError = get(error, 'originalError');

  if (originalError instanceof ValidationError) {
    formattedError = new DatabaseValidationError(originalError);
  } else if (originalError instanceof BaseError) {
    formattedError = new DatabaseError(originalError.message);
  } else if (!get(originalError, 'extensions.code')) {
    formattedError = new AppError(error.message);
  } else {
    formattedError = error;
  }

  return formattedError;
};

export const migrateDB = (sequelize: Sequelize, path: string) => new Umzug({
  migrations: {
    path,
    pattern: /\.migration.[t|j]s$/,
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor,
      () => {
        throw new Error(`Migration tried to use old style "done" callback.
          Please upgrade to "umzug" and return a promise instead.`);
      },
    ],
  },
  storage: 'sequelize',
  storageOptions: { sequelize },
}).up();
