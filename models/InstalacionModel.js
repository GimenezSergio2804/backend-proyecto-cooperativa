import mongoose from "mongoose";

const InstalacionSchema = new mongoose.Schema(
  {
    abonado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Abonado",
      required: true,
    },
    idGestar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servicio", // Referencia al servicio, no obligatorio
      required: false,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true, // Usuario que carga la instalación
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
      calle: { type: String, required: true },
      numeracion: { type: Number, required: true },
      entrecalle1: { type: String, required: false },
      entrecalle2: { type: String, required: false },
    },
    referencias: {
      type: String, // Información adicional de referencia (puede venir del servicio)
      required: false,
    },
    prioridad: {
      type: String, // Puede ser "Alta", "Media", "Baja"
      enum: ["Alta", "Media", "Baja"],
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: false, // Traído del servicio
    },
    nodo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nodo",
      required: false, // Traído del servicio
    },
    estado: {
      type: Boolean, // Estado de completado (true o false)
      required: false,
    },
    instalador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuadrilla",
      required: false, // Relacionado con la cuadrilla asignada
    },
    observacionesTecnicas: {
      type: String, // Comentarios o notas del instalador
      required: false,
    },
    onu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ONU",
      required: false,
    },
    radius: {
      usuario: { type: String, required: false },
      contraseña: { type: String, required: false },
    },
    cto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CTO",
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
      default: true, // Activo por defecto
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
