import mongoose from "mongoose";

const nodoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    required: true,
  },
});

const Nodo = mongoose.model("Nodos", nodoSchema);

export default Nodo;
