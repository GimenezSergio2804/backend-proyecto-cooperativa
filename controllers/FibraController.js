import Fibra from "../models/FibraModel.js";

const fibraControllers = {
  crearFibra: async (req, res) => {
    try {
      const nuevaFibra = new Fibra(req.body);
      const fibraGuardada = await nuevaFibra.save();
      res
        .status(201)
        .json({ mensaje: "Fibra creada con exito", fibraGuardada });
    } catch (error) {
      if (error.code === 11000) {
        // Error de clave duplicada
        return res.status(400).json({ mensaje: "La numeración ya existe." });
      }
      res.status(500).json({ mensaje: "Error al crear la fibra", error });
    }
  },
  obtenerFibras: async (req, res) => {
    try {
      const fibras = await Fibra.find().populate(
        "buffer.pelo.cto",
        "numeracion estado"
      );
      res.status(200).json(fibras);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener las fibras", error });
    }
  },
  obtenerFibraPorNumeracion: async (req, res) => {
    try {
      const fibra = await Fibra.findOne({
        numeracion: req.params.numeracion,
      }).populate("buffer.pelo.cto", "numeracion estado");
      if (!fibra) {
        return res.status(404).json({ mensaje: "Fibra no encontrada" });
      }
      res.status(200).json(fibra);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener la fibra", error });
    }
  },
  actualizarFibra: async (req, res) => {
    try {
      const fibraActualizada = await Fibra.findOneAndUpdate(
        { numeracion: req.params.numeracion },
        req.body,
        { new: true }
      ).populate("buffer.pelo.cto", "numeracion estado");
      if (!fibraActualizada) {
        return res.status(404).json({ mensaje: "Fibra no encontrada" });
      }
      res.status(200).json(fibraActualizada);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ mensaje: "La numeración ya existe." });
      }
      res.status(500).json({ mensaje: "Error al actualizar la fibra", error });
    }
  },
  eliminarFibra: async (req, res) => {
    try {
      const fibraEliminada = await Fibra.findOneAndDelete({
        numeracion: req.params.numeracion,
      });
      if (!fibraEliminada) {
        return res.status(404).json({ mensaje: "Fibra no encontrada" });
      }
      res.status(200).json({ mensaje: "Fibra eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar la fibra", error });
    }
  },
};

export default fibraControllers;
