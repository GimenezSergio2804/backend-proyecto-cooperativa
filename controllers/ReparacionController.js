import Reparacion from "../models/ReparacionModel.js";

const ReparacionController = {
  // 1. Crear una reparación
  crearReparacion: async (req, res) => {
    try {
      const {
        servicio,
        descripcion,
        prioridad,
        cuadrillaAsignada,
        comentarios,
      } = req.body;

      const nuevaReparacion = new Reparacion({
        servicio,
        descripcion,
        prioridad,
        cuadrillaAsignada,
        comentarios,
      });

      const reparacionGuardada = await nuevaReparacion.save();
      res
        .status(201)
        .json({ mensaje: "Reparacion Creada", reparacionGuardada }); // 201 es el código de éxito para creación
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al crear la reparación", error });
    }
  },

  // 2. Obtener todas las reparaciones
  obtenerReparaciones: async (req, res) => {
    try {
      const reparaciones = await Reparacion.find()
        .populate({
          path: "servicio",
          populate: [
            { path: "abonado", select: "nombres apellidos" },
            {
              path: "direccion.calle direccion.entrecalle1 direccion.entrecalle2",
              select: "nombre",
            },
          ],
        })

        .populate("cuadrillaAsignada", "nombre");
      res.status(200).json(reparaciones);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Error al obtener las reparaciones", error });
    }
  },

  // 3. Obtener una reparación por ID
  obtenerReparacionPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const reparacion = await Reparacion.findById(id)
        .populate({
          path: "servicio",
          populate: [
            { path: "abonado", select: "nombres apellidos" },
            {
              path: "direccion.calle direccion.entrecalle1 direccion.entrecalle2",
              select: "nombre",
            },
          ],
        })

        .populate("cuadrillaAsignada");
      if (!reparacion) {
        return res.status(404).json({ mensaje: "Reparación no encontrada" });
      }
      res.status(200).json(reparacion);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Error al obtener la reparación", error });
    }
  },

  // 4. Actualizar una reparación
  actualizarReparacion: async (req, res) => {
    const { id } = req.params;
    const {
      servicio,
      descripcion,
      estado,
      cuadrillaAsignada,
      comentarios,
      prioridad,
      observacionesFinales,
    } = req.body;
    try {
      const reparacionActualizada = await Reparacion.findByIdAndUpdate(
        id,
        {
          servicio,
          descripcion,
          estado,
          cuadrillaAsignada,
          comentarios,
          prioridad,
          observacionesFinales,
          fechaActualizacion: Date.now(),
        },
        { new: true } // Devuelve el objeto actualizado
      );
      if (!reparacionActualizada) {
        return res.status(404).json({ mensaje: "Reparación no encontrada" });
      }
      res.status(200).json(reparacionActualizada);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Error al actualizar la reparación", error });
    }
  },

  // 5. Eliminar una reparación
  eliminarReparacion: async (req, res) => {
    const { id } = req.params;
    try {
      const reparacionEliminada = await Reparacion.findByIdAndDelete(id);
      if (!reparacionEliminada) {
        return res.status(404).json({ mensaje: "Reparación no encontrada" });
      }
      res.status(200).json({ mensaje: "Reparación eliminada con éxito" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Error al eliminar la reparación", error });
    }
  },
};
export default ReparacionController;
