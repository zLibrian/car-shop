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

  describe('Ao tentar listar um carro em especifico', () => {
    before(async () => {
      sinon.stub(carModel, 'readOne').resolves(carsMock[1]);
    });

    afterEach(() => {
      sinon.restore();
    })
    describe('em caso de sucesso', () => {
      it('Retorna um objeto com o carro pesquisado', async () => {
        const carro = await carService.readOne(carsMock[1]._id);
        chai.expect(carro).to.be.deep.equal(carsMock[1]);
      });
    });

    describe('em caso de falha', () => {
      beforeEach(async () => {
        sinon.stub(carModel, 'readOne').resolves(null);
      });
      it('Retorna uma mensagem de erro com a mensagem de ObjectNotFound', async () => {
        try {
          await carService.readOne(carsMock[1]._id);
        } catch (erro: any) {
          chai.expect(erro).to.be.an.instanceof(Error);
          chai.expect(erro.message).to.be.equal('ObjectNotFound');
        }
      });
    });
  });

  describe('Ao tentar atualizar um carro em especifico', () => {
    before(async () => {
      sinon.stub(carModel, 'update').resolves(carsMock[2]);
    });

    afterEach(() => {
      sinon.restore();
    })
    describe('em caso de sucesso', () => {
      it('Retorna um objeto com o carro pesquisado', async () => {
        const carro = await carService.update(carsMock[1]._id, carsMock[1]);
        chai.expect(carro).to.be.deep.equal(carsMock[2]);
      });
    });

    describe('em caso de dados inválidos', () => {
      it('Error', async () => {
        try {
          await carService.update('', {} as any);
        } catch (erro) {
          chai.expect(erro).to.be.an.instanceof(Error);
        }
      });
    });

    describe('em caso de dados inválidos', () => {
      beforeEach(async () => {
        sinon.stub(carModel, 'update').resolves(null);
      });
      it('Error', async () => {
        try {
          await carService.update(carsMock[1]._id, carsMock[2]);
        } catch (erro: any) {
          chai.expect(erro).to.be.an.instanceof(Error);
          chai.expect(erro.message).to.be.equal('ObjectNotFound');
        }
      });
    });
  });
});