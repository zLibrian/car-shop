export interface CustomError {
  [key: string]: { message: string, code: number }
}

const errorMessage: CustomError = {
  CarNotFound: { code: 404, message: 'Car not found' },
  ObjectNotFound: { code: 404, message: 'Object not found' },
  InvalidMongoId: { code: 400, message: 'Id must have 24 hexadecimal characters' },
};

export default errorMessage;