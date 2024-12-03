import Cuadrilla from "../models/CuadrillaModel.js";

const CuadrillaController = {
  crearCuadrilla: async (req, res) => {
    const { nombre, tipo, tecnicos } = req.body;
    console.log("Datos recibidos:", { nombre, tipo, tecnicos });
    if (!nombre || !tipo || !tecnicos) {
      return res.status(400).json({ mensaje: "Faltan datos necesarios" });
    }

    try {
      const nuevaCuadrilla = new Cuadrilla({ nombre, tecnicos, tipo });
      const cuadrillaGuardada = await nuevaCuadrilla.save();
      res
        .status(201)
        .json({ mensaje: "Cuadrilla Creada correctamente", cuadrillaGuardada });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensajeError: "Error al crear la cuadrilla",
        error: error.mensajeError,
      });
    }
  },

  obtenerCuadrillas: async (req, res) => {
    try {
      const cuadrillas = await Cuadrilla.find().populate(
        "tecnicos",
        "nombres apellidos"
      );
      res.status(200).json(cuadrillas);
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al obtener cuadrillas" });
    }
  },

  eliminarTecnicoDeCuadrilla: async (req, res) => {
    const { cuadrillaId, tecnicoId } = req.params;
    try {
      const cuadrilla = await Cuadrilla.findById(cuadrillaId);
      if (!cuadrilla) {
        return res.status(404).json({ mensaje: "Cuadrilla no encontrada" });
      }

      cuadrilla.tecnicos = cuadrilla.tecnicos.filter(
        (tecnico) => tecnico.toString() !== tecnicoId
      );
      await cuadrilla.save();

      res.status(200).json({ mensaje: "Técnico eliminado de la cuadrilla" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar técnico", error });
    }
  },
};

export default CuadrillaController;
