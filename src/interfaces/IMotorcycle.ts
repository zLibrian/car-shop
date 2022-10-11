import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

export const MotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),

  engineCapacity: z.number({
    required_error: 'Insira o valor da capacidade do motor',
    invalid_type_error: 'Capacidade do motor do motor é um número',
  }).min(0)
    .max(2500),
});

export type IMotorcycle = z.infer<typeof MotorcycleSchema>;