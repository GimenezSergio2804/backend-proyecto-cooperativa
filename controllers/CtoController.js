import Abonado from "../models/AbonadoModel.js";
import Cto from "../models/CtoModel.js";

const ctoController = {
  crearCto: async (req, res) => {
    try {
      const { cantidad_puertos } = req.body;

      if (
        !cantidad_puertos ||
        isNaN(cantidad_puertos) ||
        cantidad_puertos <= 0
      ) {
        return res
          .status(400)
          .json({ mensajeError: "Cantidad de puertos inválida" });
      }

      const puertos = [];
      for (let i = 1; i <= cantidad_puertos; i++) {
        puertos.push({
          numero: i,
          abonado: null,
        });
      }

      req.body.puerto = puertos;

      const nuevaCto = new Cto(req.body);
      const ctoGuardada = await nuevaCto.save();
      res
        .status(201)
        .json({ mensaje: "Cto Creada Correctamente", ctoGuardada });
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al crear CTO", error });
    }
  },
  obtenerCtos: async (req, res) => {
    try {
      const ctos = await Cto.find().populate(
        "puerto.abonado",
        "nombres apellidos"
      );
      res.status(200).json(ctos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensajeError: "Error al obtener CTOs", error });
    }
  },
  obtenerCtoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const cto = await Cto.findById(id).populate(
        "puerto.abonado",
        "nombres apellidos"
      );

      if (!cto) {
        return res.status(404).json({ mensajeError: "CTO no encontrada" });
      }

      res.status(200).json(cto);
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al obtener CTO", error });
    }
  },
  actualizarCto: async (req, res) => {
    try {
      const { id } = req.params;
      const ctoActualizada = await Cto.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!ctoActualizada) {
        return res.status(404).json({ mensajeError: "CTO no encontrada" });
      }

      res.status(200).json(ctoActualizada);
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al actualizar CTO", error });
    }
  },
  eliminarCto: async (req, res) => {
    try {
      const { id } = req.params;
      const ctoEliminada = await Cto.findByIdAndDelete(id);

      if (!ctoEliminada) {
        return res.status(404).json({ mensajeError: "CTO no encontrada" });
      }

      res.status(200).json({ mensaje: "CTO eliminada con éxito" });
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al eliminar CTO", error });
    }
  },
};

export default ctoController;
