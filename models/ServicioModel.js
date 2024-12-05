import mongoose from "mongoose";

const serviciosSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      enum: ["Internet", "alarma"],
      required: true,
    },
    pago: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pagos",
    },
    contactos: {
      type: String, // Opcional, podría sacarse del abonado
    },
    usuario: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
      }, // Referencia al usuario
    },
    coordenadas: {
      type: {
        latitud: { type: Number },
        longitud: { type: Number },
      },
      default: null, // con esto lo hago opcional
    },
    direccion: {
      calle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calles",
        required: true,
      }, // Relación con la colección de calles
      numeracion: { type: Number, required: true }, // Número de la dirección
      entrecalle1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calles",
        required: false,
      },
      entrecalle2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calles",
        required: false,
      },
    },
    abonado: {
      type: mongoose.Schema.Types.ObjectId, // Relación con la colección de abonados
      ref: "Abonados",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId, // Relación con la colección de planes
      ref: "Planes",
      required: true,
    },
    activo: {
      type: Boolean,
      default: false, // Por defecto, el servicio no está activo hasta su instalación
    },
    fecha_creacion: {
      type: Date,
      default: Date.now,
    },
    idGestar: {
      type: Number, // No obligatorio
    },
    nodo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nodo",
      required: false, // Puede ser opcional según el contexto
    },
  },
  {
    timestamps: true, // Para registrar automáticamente createdAt y updatedAt
  }
);

const Servicio = mongoose.model("Servicios", serviciosSchema);
export default Servicio;
