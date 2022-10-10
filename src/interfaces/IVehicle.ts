import z from 'zod';

export const VehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022).int(),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof VehicleSchema>;