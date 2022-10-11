import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  private _service: IService<IMotorcycle>;

  constructor(service: IService<IMotorcycle>) {
    this._service = service;
  }

  public async read(req: Request, res: Response): Promise<void> {
    const motorcycle = await this._service.read();
    res.status(200).json(motorcycle);
  }

  public async create(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const motorcycles = await this._service.create(req.body);
    return res.status(201).json(motorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const motorcycle = await this._service.readOne(id);
    return res.status(200).json(motorcycle);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const newMotorcycle = await this._service.update(id, req.body);
    return res.status(200).json(newMotorcycle);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const motorcycle = await this._service.delete(id);
    return res.status(204).json(motorcycle);
  }
}