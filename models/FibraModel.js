import mongoose from "mongoose";

const fibraSchema = new mongoose.Schema(
  {
    numeracion: { type: String, required: true, unique: true },
    buffer: [
      {
        color: { type: String, required: false },
        pelo: [
          {
            numero: { type: Number, required: false },
            cto: { type: mongoose.Schema.Types.ObjectId, ref: "Ctos" },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Fibra = mongoose.model("Fibras", fibraSchema);

export default Fibra;
