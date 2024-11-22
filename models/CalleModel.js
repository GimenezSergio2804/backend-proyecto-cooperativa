import mongoose from "mongoose";

const calleSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    required: true,
  },
});

const Calle = mongoose.model("Calles", calleSchema);

export default Calle;
