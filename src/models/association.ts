import path from 'path';
import fs from 'fs';

const associate = () => {
  const models: { [key: string]: any } = {};
  fs
    .readdirSync(__dirname)
    .filter((fileName: string) => /model.[t|j]s/.test(fileName))
    .forEach((fileName) => {
      const model = require(path.resolve(__dirname, fileName));
      models[model.default.name] = model.default;
    });
  Object.keys(models).forEach((modelName: string) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });
};

export { associate };
