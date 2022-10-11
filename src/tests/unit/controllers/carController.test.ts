import chai from 'chai';
import chaisAsPromised from 'chai-as-promised';
import { Request, Response } from 'express';
import { beforeEach } from 'mocha';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarController from '../../../controllers/CarController';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock } from '../mocks/carMocks';
chai.use(chaisAsPromised);

describe('Testa o comportamento do CarController.ts', () => {

  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  describe('Ao tentar criar um carro', () => {
    const req = {} as Request;
    const res = {} as Response;

    describe('em caso de sucesso', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(carService, 'create').resolves(carMock);
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Retorna status 201 com um objeto do carro criado', async () => {
        await carController.create(req, res);
        chai.expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
        chai.expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
      });
    });

    describe('em caso de dados inválidos', () => {
      beforeEach(() => {
        sinon.stub(carService, 'create').throws(new ZodError([]));
      });
      it('A api dispara um erro', async () => {
        await chai.expect(carController.create(req, res)).to.eventually.rejectedWith(ZodError);
      });
    });
  });
});