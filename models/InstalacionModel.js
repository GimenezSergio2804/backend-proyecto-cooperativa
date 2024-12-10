import mongoose from "mongoose";

const InstalacionSchema = new mongoose.Schema(
  {
    abonado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Abonados",
      required: true,
    },
    idGestar: {
      type: Number,
      required: false,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      required: false, // Usuario que carga la instalación
    },
    observacionesAdministrativas: {
      type: String, // Traído del servicio al momento de la instalación
      required: false,
    },
    coordenadas: {
      latitud: { type: String, required: false },
      longitud: { type: String, required: false },
    },
    direccion: {
      calle: { type: mongoose.Schema.Types.ObjectId, ref: "Calles" },
      entrecalle1: { type: mongoose.Schema.Types.ObjectId, ref: "Calles" },
      entrecalle2: { type: mongoose.Schema.Types.ObjectId, ref: "Calles" },
      numeracion: { type: String, required: true },
    },
    referencias: {
      type: String, // Información adicional de referencia (puede venir del servicio)
      required: true,
    },
    prioridad: {
      type: String, // Puede ser "Alta", "Media", "Baja"
      enum: ["Alta", "Media", "Baja"],
      required: false,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Planes",
      required: true, // Traído del servicio
    },
    nodo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nodos",
      required: true, // Traído del servicio
    },
    estado: {
      type: String,
      enum: ["pendiente", "completado", "cancelado"],
      required: true,
    },
    instalador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuadrillas",
      required: false, // Relacionado con la cuadrilla asignada
    },
    observacionesTecnicas: {
      type: String, // Comentarios o notas del instalador
      required: false,
    },
    onu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Onus",
      required: false,
    },
    radius: {
      usuario: { type: String, required: false },
      contraseña: { type: String, required: false },
    },
    cto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ctos",
      required: false,
    },
    diaCoordinado: {
      type: Date, // Fecha programada para la instalación
      required: false,
    },
    tipo: {
      type: String,
      enum: ["Internet", "Alarma"], // Mantiene el tipo de servicio asociado
      required: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
    potenciaInstalacion: {
      type: String, // Potencia medida durante la instalación
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Instalacion = mongoose.model("Instalaciones", InstalacionSchema);

export default Instalacion;
