import { sequelize } from './sequelize';
import Cat from './cat.model';
import Category from './category.model';

const models = {
  sequelize,
  Cat,
  Category,
};

export type Models = typeof models;

export { models };
