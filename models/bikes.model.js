import { Schema, model }  from "mongoose";

const ModelSchema = new Schema({
    name: { type: String, required: true },
    exShowroomPrice: { type: Number, required: true },
    rto: { type: Number, required: true },
    insurance: { type: Number, required: true },
    hpa: { type: Number, required: false }, // Optional
    others: { type: Number, required: false }, // Optional
    accessories: [{ type: String }], // Array of accessories
    pdi: { type: Number, required: false }, // Optional
    total: { type: Number, required: true },
    image: { type: String, required: false }, // URL or file path
  }, { _id: false }); // _id: false to avoid generating sub-document IDs for models.
  

  const BikeSchema = new Schema({
    name: { type: String, required: true },
    models: { type: [ModelSchema], required: true },
  }, { timestamps: true });
  
  const Bike = model('Bike', BikeSchema);
  
export {
    Bike
}