import { Models } from '../models';

export class PureService {
  protected models: Models;

  constructor(models: Models) {
    this.models = models;
  }
}
