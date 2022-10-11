import chai from 'chai';
import chaisAsPromised from 'chai-as-promised';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
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

  describe('Ao tentar listar um carro em especifico', () => {
    before(async () => {
      sinon.stub(Model, 'findOne').resolves(carsMock[1]);
    });

    after(() => {
      sinon.restore();
    })
    describe('em caso de sucesso', () => {
      it('Retorna um objeto do carro cadastrado', async () => {
        const carro = await carModel.readOne(carsMock[1]._id);
        chai.expect(carro).to.be.deep.equal(carsMock[1]);
      });
    });

    describe('em caso de falha', () => {
      it('Error', async () => {
        try {
          await carModel.readOne('123');
        } catch (erro: any) {
          chai.expect(erro).to.be.an.instanceof(Error);
          chai.expect(erro.message).to.be.equal('InvalidMongoId');
        }
      });
    });
  });


  describe('Ao tentar atualizar um carro em especifico', () => {
    before(async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    });

    after(() => {
      sinon.restore();
    })
    describe('em caso de sucesso', () => {
      it('Retorna um objeto do carro atualizado', async () => {
        const carro = await carModel.update(carsMock[1]._id, carMockWithId);
        chai.expect(carro).to.be.deep.equal(carMockWithId);
      });
    });

    describe('em caso de falha', () => {
      it('Error', async () => {
        try {
          await carModel.update('123', {} as any);
        } catch (erro: any) {
          chai.expect(erro).to.be.an.instanceof(ZodError);
        }
      });
    });
  });
});