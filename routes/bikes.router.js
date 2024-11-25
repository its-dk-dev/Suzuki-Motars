import { Router } from 'express';
import { getAllBikse, registerBike } from '../controllers/bikes.controller.js';
const bikeRouter = Router();

bikeRouter.route('/register').post(registerBike);
bikeRouter.route('/').get(getAllBikse);

export default bikeRouter;
