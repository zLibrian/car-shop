import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const carRouter = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRouter.post('/', (req, res) => carController.create(req, res));
carRouter.get('/:id', (req, res) => carController.readOne(req, res));
carRouter.put('/:id', (req, res) => carController.update(req, res));
carRouter.get('/', (req, res) => carController.read(req, res));

export default carRouter;