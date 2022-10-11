import { IModel } from '../interfaces/IModel';
import { IMotorcycle, iMotorcycleSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
  private _model: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._model = model;
  }

  public async read(): Promise<IMotorcycle[]> {
    const motorcycles = await this._model.read();
    return motorcycles;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = iMotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.create(parsed.data);
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const motorcycle = await this._model.readOne(_id);
    if (!motorcycle) throw new Error('ObjectNotFound');
    return motorcycle;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = iMotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const motorcycle = await this._model.update(_id, parsed.data);
    if (!motorcycle) throw new Error('ObjectNotFound');
    return motorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    await this.readOne(_id);
    const deletedMotorcycle = await this._model.delete(_id);
    return deletedMotorcycle;
  }
}