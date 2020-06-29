import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import Category from './category.model';

class Cat extends Model {
  public id: string;

  public name: string;

  public color: string;

  public categoryId: string;

  public createdAt: Date;

  public updatedAt: Date;

  public category?: Category;

  static associate() {
    this.belongsTo(Category, {
      as: 'category',
      foreignKey: 'categoryId',
    });
  }
}

Cat.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'cats',
});

export default Cat;
