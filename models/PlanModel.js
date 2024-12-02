import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  velocidadSubida: {
    type: String,
  },
  velocidadBajada: {
    type: String,
  },
  valor: {
    type: String,
    required: true,
  },
});

const Plan = mongoose.model("Planes", planSchema);

export default Plan;
