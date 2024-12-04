import Cuadrilla from "../models/CuadrillaModel.js";
import Usuario from "../models/UsuarioModel.js";

const CuadrillaController = {
  crearCuadrilla: async (req, res) => {
    const { nombre, tipo, tecnicos } = req.body;

    if (!nombre || !tipo || !tecnicos || tecnicos.length === 0) {
      return res.status(400).json({ mensaje: "Faltan datos necesarios" });
    }

    try {
      // Crear la nueva cuadrilla
      const nuevaCuadrilla = new Cuadrilla({ nombre, tipo, tecnicos });
      const cuadrillaGuardada = await nuevaCuadrilla.save();

      // Actualizar el estado de los técnicos a "asignado"
      await Usuario.updateMany(
        { _id: { $in: tecnicos } }, // Filtrar por IDs de técnicos asignados
        { estado: "asignado" }
      );

      res.status(201).json({
        mensaje: "Cuadrilla creada correctamente",
        cuadrillaGuardada,
      });
    } catch (error) {
      console.error("Error al crear cuadrilla:", error);
      res.status(500).json({
        mensajeError: "Error al crear la cuadrilla",
        error: error.message,
      });
    }
  },
  obtenerCuadrillas: async (req, res) => {
    try {
      // Obtener las cuadrillas con los técnicos relacionados
      const cuadrillas = await Cuadrilla.find().populate(
        "tecnicos",
        "nombres apellidos"
      );

      // Si no se encuentran cuadrillas, retornar 404
      if (cuadrillas.length === 0) {
        return res.status(400).json({
          mensajeError: "No se encontraron cuadrillas",
          cuadrillas: [],
        });
      }

      // Si todo está bien, retornar las cuadrillas
      res.status(200).json(cuadrillas);
    } catch (error) {
      // Si ocurre un error, retornar 500 con mensaje detallado
      console.error(error); // Log del error para la depuración
      res.status(500).json({
        mensajeError: "Error al obtener cuadrillas",
        error: error.message,
      });
    }
  },
  eliminarCuadrilla: async (req, res) => {
    try {
      const { id } = req.params;

      // Encontrar la cuadrilla a eliminar
      const cuadrilla = await Cuadrilla.findById(id);

      if (!cuadrilla) {
        return res.status(404).json({ mensaje: "Cuadrilla no encontrada" });
      }

      // Actualizar el estado de los técnicos asignados
      await Usuario.updateMany(
        { _id: { $in: cuadrilla.tecnicos } },
        { estado: "activo" }
      );

      // Eliminar la cuadrilla
      await Cuadrilla.findByIdAndDelete(id);

      res.json({ mensaje: "Cuadrilla eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar cuadrilla:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  },
};

export default CuadrillaController;
