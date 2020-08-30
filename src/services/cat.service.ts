import { PureService } from './pure.service';
import { MutationCreateCatArgs, Cat } from '../types/graphql.type';

class CatService extends PureService {
  getCats(): Promise<Cat[]> {
    return this.models.Cat.findAll({
      include: [
        {
          model: this.models.Category,
          as: 'category',
        },
      ],
    });
  }

  createCat({ name, color, categoryId }: MutationCreateCatArgs): Promise<Cat> {
    return this.models.sequelize.transaction((transaction) => this.models.Cat.create({
      name,
      color,
      categoryId,
    }, { transaction }));
  }
}

export { CatService };
