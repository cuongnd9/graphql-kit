import { CategoryService } from '../services/category.service';
import { MutationCreateCategoryArgs, Category } from '../types/graphql.type';
import { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    categories: (_: any, __: any, { models }): Promise<Category[]> => new CategoryService(models).getCategories(),
  },
  Mutation: {
    createCategory: (
      _: any,
      args: MutationCreateCategoryArgs,
      { models }
    ): Promise<Category> => new CategoryService(models).createCategory(args),
  },
};

export default resolver;
