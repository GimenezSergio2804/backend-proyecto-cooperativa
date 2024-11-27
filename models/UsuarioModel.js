import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombres: { type: String, uppercase: true, required: true },
    apellidos: { type: String, uppercase: true, required: true }, // nombre y apellido
    legajo: { type: Number, trim: true, required: true, unique: true }, // Numero de legajo laboral
    sector: {
      type: String,
      enum: ["caja", "admin", "callcenter", "tecnico", "sistemas", "gerencia"],
      required: true,
    },
    activo: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    contacto: { type: String },
    rol: {
      type: String,
      enum: ["ADMIN", "usuario"], // rol en el sistema
      required: true,
    },
    perfil: {
      type: String,
      default: function () {
        return `../../../assets/dist/img/empleados/${this.legajo}.jpg`;
      },
    },
    password: { type: String, required: true, default: "1234" },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const Usuario = mongoose.model("Usuarios", usuarioSchema);

export default Usuario;
