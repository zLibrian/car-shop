import chai from 'chai';
import chaisAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMockWithId, carsMock } from '../mocks/carMocks';
chai.use(chaisAsPromised);

describe('Testa o comportamento do CarService.ts', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  describe('Ao tentar criar um carro', () => {
    before(async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
    });

    after(() => {
      sinon.restore();
    })
    describe('em caso de sucesso', () => {
      it('Retorna um objeto do carro criado', async () => {
        const carro = await carService.create(carMockWithId);
        chai.expect(carro).to.be.deep.equal(carMockWithId);
      });
    });

    describe('em caso de dados inválidos', () => {
      it('Error', async () => {
        try {
          await carService.create({} as any);
        } catch (erro) {
          chai.expect(erro).to.be.an.instanceof(Error);
        }
      });
    });
  });

  describe('Ao tentar listar todos os carros cadastrados', () => {
    before(async () => {
      sinon.stub(carModel, 'read').resolves(carsMock);
    });

    after(() => {
      sinon.restore();
    })
    describe('em caso de sucesso', () => {
      it('Retorna um array com todos os carros cadastrados', async () => {
        const carros = await carService.read();
        chai.expect(carros).to.be.deep.equal(carsMock);
      });
    });
  });
});