import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string({
    required_error: 'Insira o modelo do veículo',
    invalid_type_error: 'Modelo do veículo deve ser uma string',
  })
    .min(3, { message: 'Modelo do veículo deve possuir 3 ou mais caracteres' }),

  year: z.number({
    required_error: 'Insira o ano de fabricação do veículo',
    invalid_type_error: 'O ano de fabricação deve ser um número',
  })
    .min(1900, { message: 'Ano deve ser maior ou igual a 1900' })
    .max(2022, { message: 'Ano deve ser menor ou igual a 2022' })
    .int({ message: 'Ano deve ser um valor inteiro' }),

  color: z.string({
    required_error: 'Insira a cor do veículo',
    invalid_type_error: 'A cor deve ser uma string',
  })
    .min(3, { message: 'a cor deve possuir 3 ou mais caracteres' }),

  status: z.boolean({
    invalid_type_error: 'Status deve ser um booleano',
  })
    .optional(),

  buyValue: z.number({
    required_error: 'Insira o valor de compra do veículo',
    invalid_type_error: 'Valor de compra do veículo deve ser um número',
  })
    .int({ message: 'Ano deve ter um valor inteiro' }),
});

export type IVehicle = z.infer<typeof VehicleSchema>;