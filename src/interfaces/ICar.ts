import z from 'zod';
import { VehicleSchema } from './IVehicle';

export const CarZodSchema = VehicleSchema.extend({
  doorsQty: z.number({
    required_error: 'Insira número de portas do carro',
    invalid_type_error: 'Número de portas do carro deve ser um número',
  })
    .min(2, { message: 'Número de portas do carro deve ser maior ou igual a 2' })
    .max(4, { message: 'Número de portas do carro deve ser menor ou igual a 4' })
    .int({ message: 'Número de portas deve ser um número inteiro' }),

  seatsQty: z.number({
    required_error: 'Número de assentos do carro requerido',
    invalid_type_error: 'Numero de assentos deve ser um número',
  })
    .min(2, { message: 'Número de assentos do carro deve ser maior ou igual a 2' })
    .max(7, { message: 'Número de assentos do carro deve ser menor ou igual a 4' })
    .int({ message: 'Número de assentos deve ser um valor inteiro' }),
});

export type ICar = z.infer<typeof CarZodSchema>;