import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import Cat from './cat.model';

class Category extends Model {
  public id: string;

  public name: string;

  public createdAt: Date;

  public updatedAt: Date;

  public cats?: Cat[];

  static associate() {
    this.hasMany(Cat, {
      as: 'cats',
      foreignKey: 'categoryId',
    });
  }
}

Category.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'categories',
});

export default Category;
