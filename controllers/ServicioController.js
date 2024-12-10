import Servicio from "../models/ServicioModel.js";
import Instalacion from "../models/InstalacionModel.js";
import Reparacion from "../models/ReparacionModel.js";
import Pago from "../models/PagoModel.js";

const ServicioController = {
  crearServicio: async (req, res) => {
    console.log(req.body);
    try {
      const {
        tipo,
        pago,
        direccion,
        coordenadas,
        referencias,
        abonado,
        plan,
        nodo,
        observacionesAdministrativas,
      } = req.body;

      // Desestructura los campos de la dirección si es necesario
      const { calle, numeracion, entrecalle1, entrecalle2 } = direccion || {};

      // Crear el servicio
      const nuevoServicio = new Servicio({
        tipo,
        pago,
        // usuario,
        direccion: {
          calle,
          numeracion,
          entrecalle1,
          entrecalle2,
        },
        coordenadas,
        abonado,
        plan,
        nodo,
        activo: false, // Por default no está instalado
      });

      const servicioGuardado = await nuevoServicio.save();

      // actualiza el pago
      if (pago && pago != null) {
        const pagoEncontrado = await Pago.findById(pago);
        if (!pagoEncontrado) {
          return res
            .status(404)
            .json({ mensaje: "El pago proporcionado no existe." });
        }
        if (pagoEncontrado.estado === true) {
          return res
            .status(400)
            .json({ mensaje: "El pago ya ha sido utilizado." });
        }
        pagoEncontrado.estado = true;
        await pagoEncontrado.save();
      }

      // Crear la instalación automáticamente
      const nuevaInstalacion = new Instalacion({
        abonado: servicioGuardado.abonado,
        idGestar: 0,
        observacionesAdministrativas,
        direccion: {
          calle,
          numeracion,
          entrecalle1,
          entrecalle2,
        },
        coordenadas,
        plan: plan,
        tipo: tipo,
        nodo: nodo,
        referencias: referencias,
        estado: "pendiente",
        fecha_programada: new Date(),
      });

      const instalacionGuardada = await nuevaInstalacion.save();

      // Respuesta exitosa
      res.status(201).json({
        mensaje: "Servicio y instalación creados con éxito",
        servicio: servicioGuardado,
        // instalacion: instalacionGuardada,
      });
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  },
  obtenerServicios: async (req, res) => {
    try {
      const servicios = await Servicio.find()
        .populate("abonado", "nombres apellidos")
        .populate("plan", "nombre valor")
        .populate("pago", "estado nombre")
        .populate("nodo", "nombre")
        // .populate("usuario", "nombres")
        .populate("direccion.calle", "nombre") // Relación con calle en coordenadas
        .populate("direccion.entrecalle1", "nombre") // Relación con entrecalle1
        .populate("direccion.entrecalle2", "nombre"); // Relación con entrecalle2
      res.status(200).json(servicios);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      res
        .status(500)
        .json({ mensaje: "Error al obtener los servicios", error });
    }
  },
  eliminarServicio: async (req, res) => {
    try {
      const { id } = req.params;

      // Verificar si el servicio existe
      const servicio = await Servicio.findById(id);
      if (!servicio) {
        return res.status(404).json({ mensaje: "Servicio no encontrado" });
      }

      // Eliminar el servicio
      await servicio.deleteOne();

      res.status(200).json({ mensaje: "Servicio eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      res.status(500).json({ mensaje: "Error al eliminar el servicio" });
    }
  },
  getServicioById: async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID del servicio desde los parámetros de la URL
      const servicio = await Servicio.findById(id)
        .populate("pago") //
        .populate("abonado") //
        .populate("tipo")
        .populate("plan")
        .populate("nodo")
        .populate("direccion.calle")
        .populate("direccion.entrecalle1")
        .populate("direccion.entrecalle2");

      if (!servicio) {
        return res.status(404).json({ mensajeError: "Servicio no encontrado" });
      }

      return res.status(200).json(servicio);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ mensajeError: "Error al obtener el servicio" });
    }
  },

  updateServicio: async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID del servicio desde los parámetros de la URL
      const updatedData = req.body; // Los datos del servicio a actualizar

      // Validación: Puedes agregar validaciones adicionales según tus necesidades
      if (!updatedData) {
        return res
          .status(400)
          .json({ mensajeError: "Datos incompletos para actualizar" });
      }

      // Intentamos encontrar y actualizar el servicio
      const servicio = await Servicio.findByIdAndUpdate(id, updatedData, {
        new: true,
      }); // El { new: true } devuelve el servicio actualizado

      if (!servicio) {
        return res.status(404).json({ mensajeError: "Servicio no encontrado" });
      }

      return res.status(200).json(servicio);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ mensajeError: "Error al actualizar el servicio" });
    }
  },

  // fibra_datos: async (req, res) => {
  //   try {
  //     const instalaciones = await Instalacion.countDocuments({
  //       tipo: "Internet",
  //       estado: "pendiente",
  //     });

  //     res.json({ instalaciones, reparaciones });
  //   } catch (error) {
  //     console.error("Error al obtener datos de fibra óptica:", error);
  //     res.status(500).json({ error: "Error al obtener datos" });
  //   }
  // },
};
export default ServicioController;
