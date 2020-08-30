import joi from 'joi';

import { middleware, schemaValidation } from '../components';
import { CatService } from '../services/cat.service';
import { MutationCreateCatArgs, Cat } from '../types/graphql.type';
import { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    cats: (_: any, __: any, { models }): Promise<Cat[]> => new CatService(models).getCats(),
  },
  Mutation: {
    createCat: middleware(
      schemaValidation({
        color: joi.string().valid('black', 'white'),
      }),
      // @ts-ignore
      (_: any, args: MutationCreateCatArgs, { models }): Promise<Cat> => new CatService(models).createCat(args),
    ),
  },
};

export default resolver;
