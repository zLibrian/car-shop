import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import CarService from '../services/CarService';

export default class CarController {
  constructor(private _service: CarService) { }

  public async create(req: Request, res: Response<ICar>) {
    const createdCar = await this._service.create(req.body);
    return res.status(201).json(createdCar);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const cars = await this._service.read();
    return res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    if (id.length < 24) {
      throw new Error('InvalidMongoId');
    }
    const car = await this._service.readOne(id);
    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    if (id.length < 24) {
      throw new Error('InvalidMongoId');
    }
    const car = await this._service.update(id, req.body);
    return res.status(200).json(car);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }
}