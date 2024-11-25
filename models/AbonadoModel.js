import mongoose from "mongoose";

const abonadoSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    dni: { type: Number, required: true, unique: true },
    mail: { type: String, required: false },
    direccion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calles",
      required: true,
    },
    entrecalle1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calles",
      required: true,
    },
    entrecalle2: { type: mongoose.Schema.Types.ObjectId, ref: "Calles" },
    contacto: { type: String, required: true },
    referencia: { type: String, required: false },
  },

  { timestamps: true }
);

const Abonado = mongoose.model("Abonados", abonadoSchema);
export default Abonado;
