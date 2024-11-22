import Cuadrilla from "../models/CuadrillaModel.js";

const CuadrillaController = {
  crearCuadrilla: async (req, res) => {
    const { nombre, tecnicos, tipo } = req.body;

    try {
      const nuevaCuadrilla = new Cuadrilla({ nombre, tecnicos, tipo });
      const cuadrillaGuardada = await nuevaCuadrilla.save();
      res.status(201).json({ mensaje: "Cuadrilla Creada correctamente" });
    } catch (error) {
      res.status(400).json({
        mensajeError: "Error al crear la cuadrilla",
        error: error.meesage,
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
};

export default CuadrillaController;
