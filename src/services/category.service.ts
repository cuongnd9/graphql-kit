import sequelize from '../models';
import Cat from '../models/cat.model';
import Category from '../models/category.model';

class CategoryService {
  static getCategories() {
    return Category.findAll({
      include: [
        {
          model: Cat,
          as: 'cats',
        },
      ],
    });
  }

  static createCategory({ name }: { name: string }) {
    return sequelize.transaction((transaction) => Category.create({
      name,
    }, { transaction }));
  }
}

export default CategoryService;
