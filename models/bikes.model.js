import { Schema, model } from 'mongoose';

const ModelSchema = new Schema(
  {
    'Model Name': { type: String, required: true },
    'Ex-Showroom price': { type: Number, required: true },
    RTO: { type: Number, required: true },
    Insurance: { type: Number, required: true },
    HPA: { type: Number, required: false }, // Optional
    Others: { type: Number, required: false }, // Optional
    Accessories: [{ type: String }], // Array of accessories
    PDI: { type: Number, required: false }, // Optional
    Total: { type: Number, required: true },
    Image: { type: String, required: false }, // URL or file path
  },
  { _id: false }
); // _id: false to avoid generating sub-document IDs for models.

const BikeSchema = new Schema(
  {
    name: { type: String, required: true },
    models: { type: [ModelSchema], required: true },
  },
  { timestamps: true }
);

const Bike = model('Bike', BikeSchema);

export { Bike };
