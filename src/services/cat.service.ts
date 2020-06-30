import sequelize from '../models';
import Cat from '../models/cat.model';
import Category from '../models/category.model';
import { CatCreationInput } from '../types/cat.type';

class CatService {
  static getCats() {
    return Cat.findAll({
      include: [
        {
          model: Category,
          as: 'category',
        },
      ],
    });
  }

  static createCat({ name, color, categoryId }: CatCreationInput) {
    return sequelize.transaction((transaction) => Cat.create({
      name,
      color,
      categoryId,
    }, { transaction }));
  }
}

export default CatService;
