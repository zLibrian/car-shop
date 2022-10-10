import { CarSchema, ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';
import CarModel from '../models/CarModel';

export default class CarService implements IService<ICar> {
  private _carModel: CarModel;
  constructor(carModel: CarModel) {
    this._carModel = carModel;
  }

  public async create(car: ICar): Promise<ICar> {
    const parsed = CarSchema.safeParse(car);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._carModel.create(parsed.data);
  }
}