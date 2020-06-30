import joi from 'joi';

import { middleware, schemaValidation } from '../components';
import CatService from '../services/cat.service';
import { CatCreationInput } from '../types/cat.type';

const resolver = {
  Query: {
    cats: () => CatService.getCats(),
  },
  Mutation: {
    createCat: middleware(
      schemaValidation({
        color: joi.string().valid('black', 'white'),
      }),
      (_: any, args: CatCreationInput) => CatService.createCat(args),
    ),
  },
};

export default resolver;
