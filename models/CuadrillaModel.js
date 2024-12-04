import mongoose from "mongoose";

const cuadrillaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tecnicos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
      },
    ],
    tipo: {
      type: String,
      enum: ["Instalacion", "Reparacion", "Plantel"],
    },
  },

  {
    timestamps: true, // Para createdAt y updatedAt
  }
);

const Cuadrilla = mongoose.model("Cuadrilla", cuadrillaSchema);

export default Cuadrilla;
