import mongoose from "mongoose";

const onuSchema = new mongoose.Schema({
  id_onu: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  serial: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  admin: {
    type: String,
    required: true,
    trim: true,
  },
  contra_wifi: {
    type: String,
  },
  estado: {
    type: String,
    enum: ["falla", "en uso", "virgen"],
    default: "virgen",
    required: true,
  },
  descripcion_falla: {
    type: String,
  },
});

const Onu = mongoose.model("Onus", onuSchema);

export default Onu;
