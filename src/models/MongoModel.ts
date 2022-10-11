import { isValidObjectId, Model } from 'mongoose';
import { CarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;
  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');
    return this._model.findOne({ _id });
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.findByIdAndUpdate(_id, parsed.data);
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('ObjectNotFound');
    return this._model.findOneAndDelete({ _id });
  }
}
