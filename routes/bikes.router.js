import { Router } from 'express'
import {
  registerBike,
} from '../controllers/bikes.controller.js'
const bikeRouter = Router();

bikeRouter.route('/register').post(registerBike);

export default bikeRouter;
