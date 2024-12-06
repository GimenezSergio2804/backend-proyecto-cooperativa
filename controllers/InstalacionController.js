import Instalacion from "../models/InstalacionModel.js";
import Abonado from "../models/AbonadoModel.js";
import Servicio from "../models/ServicioModel.js";

const InstalacionController = {
  crearInstalacion: async (req, res) => {
    try {
      const {
        abonado,
        idGestar,
        usuario,
        observacionesAdministrativas,
        coordenadas,
        direccion,
        referencias,
        prioridad,
        plan,
        nodo,
        estado,
        instalador,
        observacionesTecnicas,
        onu,
        radius,
        cto,
        diaCoordinado,
        potenciaInstalacion,
        tipo,
        activo,
      } = req.body;

      // Validar que el abonado exista
      const abonadoExistente = await Abonado.findById(abonado);
      if (!abonadoExistente) {
        return res.status(404).json({ mensaje: "El abonado no existe." });
      }

      // Validar que el servicio exista si se proporciona idGestar
      if (idGestar) {
        const servicioExistente = await Servicio.findById(idGestar);
        if (!servicioExistente) {
          return res
            .status(404)
            .json({ mensaje: "El servicio relacionado no existe." });
        }
      }

      // Crear la instalación
      const nuevaInstalacion = new Instalacion({
        abonado,
        idGestar,
        usuario,
        observacionesAdministrativas,
        coordenadas,
        direccion,
        referencias,
        prioridad,
        plan,
        nodo,
        estado,
        instalador,
        observacionesTecnicas,
        onu,
        radius,
        cto,
        diaCoordinado,
        potenciaInstalacion,
        tipo,
        activo,
      });

      const instalacionGuardada = await nuevaInstalacion.save();
      return res.status(201).json({
        mensaje: "Instalación creada exitosamente.",
        instalacion: instalacionGuardada,
      });
    } catch (error) {
      console.error("Error al crear la instalación:", error);
      return res
        .status(500)
        .json({ mensaje: "Error al crear la instalación.", error });
    }
  },

  // Obtener todas las instalaciones
  obtenerInstalaciones: async (req, res) => {
    try {
      const instalaciones = await Instalacion.find()
        .populate("abonado", "nombre apellido")
        .populate("usuario", "nombre correo")
        .populate("plan", "nombre precio")
        .populate("nodo", "nombre")
        .populate("instalador", "nombre cuadrilla")
        .populate("onu", "modelo")
        .populate("cto", "nombre");

      return res.status(200).json({ instalaciones });
    } catch (error) {
      console.error("Error al obtener las instalaciones:", error);
      return res
        .status(500)
        .json({ mensaje: "Error al obtener las instalaciones.", error });
    }
  },

  // Obtener una instalación por ID
  obtenerInstalacionPorId: async (req, res) => {
    try {
      const { id } = req.params;

      const instalacion = await Instalacion.findById(id)
        .populate("abonado", "nombre apellido")
        .populate("usuario", "nombre correo")
        .populate("plan", "nombre precio")
        .populate("nodo", "nombre")
        .populate("instalador", "nombre cuadrilla")
        .populate("onu", "modelo")
        .populate("cto", "nombre");

      if (!instalacion) {
        return res.status(404).json({ mensaje: "Instalación no encontrada." });
      }

      return res.status(200).json({ instalacion });
    } catch (error) {
      console.error("Error al obtener la instalación:", error);
      return res
        .status(500)
        .json({ mensaje: "Error al obtener la instalación.", error });
    }
  },

  // Actualizar una instalación
  actualizarInstalacion: async (req, res) => {
    try {
      const { id } = req.params;
      const datosActualizados = req.body;

      const instalacionActualizada = await Instalacion.findByIdAndUpdate(
        id,
        datosActualizados,
        {
          new: true,
        }
      );

      if (!instalacionActualizada) {
        return res.status(404).json({ mensaje: "Instalación no encontrada." });
      }

      return res.status(200).json({
        mensaje: "Instalación actualizada exitosamente.",
        instalacion: instalacionActualizada,
      });
    } catch (error) {
      console.error("Error al actualizar la instalación:", error);
      return res
        .status(500)
        .json({ mensaje: "Error al actualizar la instalación.", error });
    }
  },

  // Eliminar una instalación
  eliminarInstalacion: async (req, res) => {
    try {
      const { id } = req.params;

      const instalacionEliminada = await Instalacion.findByIdAndDelete(id);
      if (!instalacionEliminada) {
        return res.status(404).json({ mensaje: "Instalación no encontrada." });
      }

      return res.status(200).json({
        mensaje: "Instalación eliminada exitosamente.",
        instalacion: instalacionEliminada,
      });
    } catch (error) {
      console.error("Error al eliminar la instalación:", error);
      return res
        .status(500)
        .json({ mensaje: "Error al eliminar la instalación.", error });
    }
  },
};

export default InstalacionController;
