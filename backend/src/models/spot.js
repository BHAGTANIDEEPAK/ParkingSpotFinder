import mongoose, { Document, Schema } from 'mongoose';


const spotSchema = new Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  is_available: { type: Boolean, default: true },
});

const Spot = mongoose.model('Spot', spotSchema);
export default Spot;
