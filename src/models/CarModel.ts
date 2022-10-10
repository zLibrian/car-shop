import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const mongooseCarSchema = new Schema<ICar>({
  model: {
    type: String,
    required: [true, 'Insira o modelo do veículo'],
  },
  year: {
    type: Number,
    required: [true, 'Insira o ano de fabricação do veículo'],
  },
  color: {
    type: String,
    required: [true, 'Insira a cor do veículo'],
  },
  status: Boolean,
  buyValue: {
    type: Number,
  },
  doorsQty: {
    type: Number,
    required: [true, 'Insira número de portas do carro'],
  },
  seatsQty: {
    type: Number,
    required: [true, 'Número de assentos do carro requerido'],
  },
});

export default class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('cars', mongooseCarSchema)) {
    super(model);
  }
}