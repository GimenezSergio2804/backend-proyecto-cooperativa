import Calle from "../models/CalleModel.js";

const CalleController = {
  obtenerCalles: async (req, res) => {
    try {
      const calles = await Calle.find({});
      res.status(200).json(calles);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener las calles", error });
    }
  },

  crearCalle: async (req, res) => {
    const { nombre } = req.body;
    try {
      const calleNueva = await Calle.create({ nombre });
      res.status(201).json({ mensaje: "Calle Creada con exito", calleNueva });
    } catch (error) {
      res.status(400).json({ mensajeError: "Error al cargar la calle", error });
    }
  },

  obtenerCalleId: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.params);
      const calleID = await Calle.findById(id);

      if (!calleID) {
        res.status(404).json({ mensajeError: "Calle no encontrada" });
      }

      res.status(200).json(calleID);
    } catch (error) {
      res.status(400).json({ mensajeError: "Error al buscar la calle", error });
    }
  },
  actualizarCalle: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;

      const calle = await Calle.findByIdAndUpdate(
        id,
        { nombre },
        { new: true }
      );

      if (!calle) {
        res.status(400).json({ mensajeError: "Calle no encontrada" });
      }

      res.json({ mensaje: "Calle Actualizada", calle });
    } catch (error) {
      res.satatus(404).json({ mensajeError: "Error al actualizar la calle" });
    }
  },
  eliminarCalle: async (req, res) => {
    try {
      const { id } = req.params;

      const calle = await Calle.findByIdAndDelete(id);

      if (!calle) {
        res.status(400).json({ mensajeError: "Calle no encontrada" });
      }

      res.json({ mensaje: "Calle Eliminada", calle });
    } catch (error) {
      res.status(404).json({ mensajeError: "Error al eliminar la calle" });
    }
  },
};

export default CalleController;
