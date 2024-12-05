import Servicio from "../models/ServicioModel.js";
import Instalacion from "../models/InstalacionModel.js";
import Pago from "../models/PagoModel.js";

const ServicioController = {
  crearServicio: async (req, res) => {
    try {
      const {
        tipo,
        pago,
        usuario,
        direccion, // Incluye la propiedad `direccion` directamente
        coordenadas,
        abonado,
        plan,
      } = req.body;

      // Desestructura los campos de la dirección si es necesario
      const { calle, numeracion, entrecalle1, entrecalle2 } = direccion || {};

      // Crear el servicio
      const nuevoServicio = new Servicio({
        tipo,
        pago,
        usuario,
        direccion: {
          calle,
          numeracion,
          entrecalle1,
          entrecalle2,
        },
        coordenadas,
        abonado,
        plan,
        activo: false, // Por default no está instalado
      });

      const servicioGuardado = await nuevoServicio.save();

      // Si hay un pago, actualiza su estado
      if (pago) {
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
        servicio: servicioGuardado._id,
        estado: "pendiente", // Por default pendiente
        fecha_programada: new Date(),
      });

      const instalacionGuardada = await nuevaInstalacion.save();

      // Respuesta exitosa
      res.status(201).json({
        mensaje: "Servicio y instalación creados con éxito",
        servicio: servicioGuardado,
        instalacion: instalacionGuardada,
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
        .populate("usuario", "nombres")
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
};

export default ServicioController;
