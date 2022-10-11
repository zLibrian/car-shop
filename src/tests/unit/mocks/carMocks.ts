import { ICar } from "../../../interfaces/ICar";

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockWithId: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
}

const carsMock: (ICar & { _id: string })[] = [
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2,
  },
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Corsa",
    year: 1923,
    color: "black",
    buyValue: 20000,
    seatsQty: 4,
    doorsQty: 4,
  },
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Versa",
    year: 1963,
    color: "blue",
    buyValue: 15000,
    seatsQty: 2,
    doorsQty: 2,
  },
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Prisma",
    year: 1963,
    color: "yellow",
    buyValue: 30000,
    seatsQty: 5,
    doorsQty: 4,
  }
]

export {
  carMock,
  carMockWithId,
  carsMock
};
