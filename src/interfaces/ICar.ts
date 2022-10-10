import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

export const CarZodSchema = VehicleSchema.extend({
  doorsQty: z.number().min(2).max(4).int(),
  seatsQty: z.number().min(2).max(7).int(),
});

export type ICar = z.infer<typeof CarZodSchema>;