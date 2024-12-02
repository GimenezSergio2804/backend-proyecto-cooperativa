import mongoose from "mongoose";

const nodoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    required: true,
  },
  ubicacion: {
    lat: { type: Number, required: false }, // Latitud
    lng: { type: Number, required: false }, // Longitud
  },
});

const Nodo = mongoose.model("Nodos", nodoSchema);

export default Nodo;
