import mongoose from "mongoose";

const CtoSchema = new mongoose.Schema(
  {
    numeracion: { type: String, required: true, unique: true },
    ubicacion: {
      lat: { type: Number, required: false }, // Latitud
      lng: { type: Number, required: false }, // Longitud
    },
    cantidad_puertos: { type: Number, required: true }, // Total de puertos
    cantidad_puertos_libres: { type: Number, required: true }, // Puertos disponibles
    cantidad_puertos_danados: { type: Number, required: true }, // Puertos dañados, ver despues si lo manejo con string o un array
    cantidad_puertos_utilizados: { type: Number, required: true }, // Puertos en uso
    estado: {
      type: String,
      enum: ["funcionando", "daño total", "puertos con fallas", "obra"], // Estados posibles
      required: true,
      default: "obra",
    },
    descripcion_falla: { type: String, default: "" },
    puerto: [
      {
        numero: { type: Number, required: true, unique: true }, // Número del puerto
        abonado: { type: mongoose.Schema.Types.ObjectId, ref: "Abonados" }, // Referencia al abonado conectado
      },
    ],
  },
  { timestamps: true }
);

const Cto = mongoose.model("Ctos", CtoSchema);
export default Cto;
