import { PureService } from './pure.service';
import { MutationCreateCategoryArgs, Category } from '../types/graphql.type';

class CategoryService extends PureService {
  getCategories(): Promise<Category[]> {
    return this.models.Category.findAll({
      include: [
        {
          model: this.models.Cat,
          as: 'cats',
        },
      ],
    });
  }

  createCategory({ name }: MutationCreateCategoryArgs): Promise<Category> {
    return this.models.sequelize.transaction((transaction) => this.models.Category.create({
      name,
    }, { transaction }));
  }
}

export { CategoryService };
