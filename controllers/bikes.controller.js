import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Bike } from '../models/bikes.model.js'


const registerBike = asyncHandler(async (req, res) => {
  const newBike = new Bike({
    name: 'Super Bike',
    models: [
      {
        name: 'Super Bike Model 1',
        exShowroomPrice: 150000,
        rto: 10000,
        insurance: 5000,
        total: 165000,
        accessories: ['Seat Cover', 'Mudguard'],
      },
    ],
  });

  const { isNew } = await newBike.save();

  if (!isNew) {
    throw new ApiError(500, 'Something went wrong while registering the user ')
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newBike, 'Bike Registerd Successfully'))
})


export {
  registerBike,
}
