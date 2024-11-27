import Calle from "../models/CalleModel.js";

const CalleController = {
  obtenerCalles: async (req, res) => {
    try {
      // Obtener parametros de paginacion desde la query (valores predeterminados: pagina 1, 10 elementos por pagina)
      const { page = 1, pageSize = 10 } = req.query;

      // convertimos a numeros para evitar errores
      const pageNumber = parseInt(page, 10);
      const pageSizeNumber = parseInt(pageSize, 10);

      // Calcular el número de documentos a omitir
      const skip = (pageNumber - 1) * pageSizeNumber;

      // Realizar la consulta paginada
      const calles = await Calle.find().skip(skip).limit(pageSizeNumber);

      // Contar el total de documentos en la colección
      const total = await Calle.countDocuments();

      // Enviar la respuesta con las calles y el total
      res.status(200).json({
        calles,
        total,
        page: pageNumber,
        pageSize: pageSizeNumber,
      });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener las calles", error });
    }
  },

  crearCalle: async (req, res) => {
    const { nombre } = req.body;

    // verificamos q el campo no esta vacion
    if (!nombre) {
      return res.status(400).json({ mensajeError: "El nombre es obligatorio" });
    }

    // converti el nombre a mayusculas( no me hace falta porque ya lo hace mi modelo)
    // const nombreEnMayusculas = nombre.toUpperCase();

    try {
      // Verificar si la calle ya existe
      const calleExistente = await Calle.findOne({ nombre: nombre });
      if (calleExistente) {
        return res.status(400).json({ mensajeError: "La calle ya existe" });
      }

      const calleNueva = await Calle.create({ nombre: nombre });

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
