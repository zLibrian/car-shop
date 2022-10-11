import chai from 'chai';
import chaisAsPromised from 'chai-as-promised';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carMockWithId, carsMock } from '../mocks/carMocks';
chai.use(chaisAsPromised);

describe('Testa o comportamento do CarModel.ts', () => {
  const carModel = new CarModel();
  describe('Ao tentar criar um carro', () => {
    before(async () => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
    });

    after(() => {
      sinon.restore();
    })
    describe('em caso de sucesso', () => {
      it('Retorna um objeto do carro criado', async () => {
        const carro = await carModel.create(carMockWithId);
        chai.expect(carro).to.be.deep.equal(carMockWithId);
      });
    });
  });

  describe('Ao tentar listar todos os carros cadastrados', () => {
    before(async () => {
      sinon.stub(Model, 'find').resolves(carsMock);
    });

    after(() => {
      sinon.restore();
    })
    describe('em caso de sucesso', () => {
      it('Retorna um array com todos os carros cadastrados', async () => {
        const carros = await carModel.read();
        chai.expect(carros).to.be.deep.equal(carsMock);
      });
    });
  });
});