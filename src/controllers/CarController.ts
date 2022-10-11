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
}