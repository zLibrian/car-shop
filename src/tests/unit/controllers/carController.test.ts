import chai from 'chai';
import chaisAsPromised from 'chai-as-promised';
import { Request, Response } from 'express';
import { beforeEach } from 'mocha';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarController from '../../../controllers/CarController';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carsMock } from '../mocks/carMocks';
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

  describe('Ao tentar listar todos os carros', () => {
    const req = {} as Request;
    const res = {} as Response;

    describe('em caso de sucesso', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(carService, 'read').resolves(carsMock);
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Retorna status 200 com um array de carros cadastrados', async () => {
        await carController.read(req, res);
        chai.expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        chai.expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
      });
    });
  });

  describe('Ao tentar listar um carro em especifico', () => {
    const req = {} as Request;
    const res = {} as Response;

    describe('em caso de sucesso', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = { id: carsMock[1]._id };
        sinon.stub(carService, 'readOne').resolves(carsMock[1]);
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Retorna status 200 com o carro cadastrado', async () => {
        await carController.readOne(req, res);
        chai.expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        chai.expect((res.json as sinon.SinonStub).calledWith(carsMock[1])).to.be.true;
      });
    });

    describe('em caso de falha', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = { id: '123' };
        sinon.stub(carService, 'readOne').resolves();
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Retorna status 400 com uma mensagem de erro', async () => {
        try {
          await carController.readOne(req, res);
        } catch (error: any) {
          chai.expect(error.message).to.be.equal('InvalidMongoId')
        }
      });
    });
  });


  describe('Ao tentar atualizar um carro em especifico', () => {
    const req = {} as Request;
    const res = {} as Response;

    describe('em caso de sucesso', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = { id: carsMock[1]._id };
        sinon.stub(carService, 'update').resolves(carsMock[2]);
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Retorna status 200 com o carro cadastrado', async () => {
        await carController.update(req, res);
        chai.expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        chai.expect((res.json as sinon.SinonStub).calledWith(carsMock[2])).to.be.true;
      });
    });

    describe('em caso de falha', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = { id: '123' };
        sinon.stub(carService, 'update').resolves();
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Retorna status 400 com uma mensagem de erro', async () => {
        try {
          await carController.update(req, res);
        } catch (error: any) {
          chai.expect(error.message).to.be.equal('InvalidMongoId')
        }
      });
    });
  });
});