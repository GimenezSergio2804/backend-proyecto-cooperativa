import mongoose from "mongoose";

const reparacionSchema = new mongoose.Schema({
  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicios",
    required: true,
  },
  fechaSolicitud: {
    type: Date,
    default: Date.now(),
  },
  estado: {
    type: Boolean,
    default: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  cuadrillaAsignada: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cuadrillas",
    required: false,
  },
  comentarios: {
    type: String,
    required: false,
  },
  prioridad: {
    type: String,
    enum: ["alta", "media", "baja"],
    default: "baja",
    required: true,
  },
  fechaActualizacion: {
    type: Date,
    required: false,
  },
  observacionesFinales: {
    type: String,
    required: false,
  },
});

const Reparacion = mongoose.model("Reparaciones", reparacionSchema);
export default Reparacion;
