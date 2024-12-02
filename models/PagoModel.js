import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
  },
  contacto: {
    type: String,
  },
  codigo_de_transaccion: {
    type: String,
  },
  email: {
    type: String,
  },
  medio_de_pago: {
    type: String,
    enum: ["Efectivo", "Debito", "Credito", "Mercado Pago", "Transferencia"],
    required: true,
  },
  monto: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
});

const Pago = mongoose.model("Pagos", pagoSchema);

export default Pago;
