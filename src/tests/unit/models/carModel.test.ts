import chai from 'chai';
import chaisAsPromised from 'chai-as-promised';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carMockWithId } from '../mocks/carMocks';
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
});