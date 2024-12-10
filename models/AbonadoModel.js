import mongoose from "mongoose";

const abonadoSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    dni: { type: Number, required: true, unique: true },
    mail: { type: String, required: false },
    contacto: { type: String, required: true },
  },

  { timestamps: true }
);

const Abonado = mongoose.model("Abonados", abonadoSchema);
export default Abonado;
