import CategoryService from '../services/category.service';

const resolver = {
  Query: {
    categories: () => CategoryService.getCategories(),
  },
  Mutation: {
    createCategory: (_: any, args: { name: string }) => CategoryService.createCategory(args),
  },
};

export default resolver;
