import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Bike } from '../models/bikes.model.js';

const registerBike = asyncHandler(async (req, res) => {
  console.log(req.body);
  // const newBike = new Bike({
  //   name: 'Super Bike',
  //   models: [
  //     {
  //       name: 'Super Bike Model 1',
  //       exShowroomPrice: 150000,
  //       rto: 10000,
  //       insurance: 5000,
  //       total: 165000,
  //       accessories: ['Seat Cover', 'Mudguard'],
  //     },
  //   ],
  // });

  const newBike = await new Bike(req.body);

  await newBike.save();

  return res
    .status(201)
    .json(new ApiResponse(200, newBike, 'Bike Registerd Successfully'));
});

const getAllBikse = asyncHandler(async (req, res) => {
  const allBikes = await Bike.find({});

  return res.status(200).json(new ApiResponse(200, allBikes, 'all Bikes list'));
});

export { registerBike, getAllBikse };
