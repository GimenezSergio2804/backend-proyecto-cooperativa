import Abonado from "../models/AbonadoModel.js";

const AbonadoController = {
  crearAbonado: async (req, res) => {
    try {
      const nuevoAbonado = new Abonado(req.body);
      const abonadoGuardado = await nuevoAbonado.save();
      res
        .status(201)
        .json({ mensaje: "Abonado creado con exito", abonadoGuardado });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al crear el abonado", error });
    }
  },
  obtenerAbonados: async (req, res) => {
    try {
      const abonados = await Abonado.find()
        .populate("direccion", "nombre")
        .populate("entrecalle1", "nombre")
        .populate("entrecalle2", "nombre");
      res.status(200).json(abonados);
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al obtener los abonados" });
    }
  },
  obtenerAbonadoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const abonado = await Abonado.findById(id)
        .populate("direccion", "nombre")
        .populate("entrecalle1", "nombre")
        .populate("entrecalle2", "nombre");

      if (!abonado) {
        return res.status(404).json({ mensajeError: "Abonado no encontrado" });
      }

      res.status(200).json(abonado);
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al obtener abonado", error });
    }
  },

  actualizarAbonado: async (req, res) => {
    try {
      const { id } = req.params;
      const abonadoActualizado = await Abonado.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!abonadoActualizado) {
        return res.status(404).json({ mensajeError: "Abonado no encontrado" });
      }

      res.status(200).json(abonadoActualizado);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al actualizar abonado", error });
    }
  },

  eliminarAbonado: async (req, res) => {
    try {
      const { id } = req.params;
      const abonadoEliminado = await Abonado.findByIdAndDelete(id);

      if (!abonadoEliminado) {
        return res.status(404).json({ mensajeError: "Abonado no encontrado" });
      }

      res.status(200).json({ mensaje: "Abonado eliminado con éxito" });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al eliminar abonado", error });
    }
  },

  obtenerAbonadoNombreApellido: async (req, res) => {
    try {
      const { nombre, apellido } = req.query;
      console.log(nombre, apellido);

      // objeto como para realizar la query
      let query = {};

      if (nombre) {
        query.nombres = { $regex: nombre, $options: "i" }; // hago q no sea sensible a mayuscula y minuscula
      }
      if (apellido) {
        query.apellidos = { $regex: apellido, $options: "i" };
      }

      // Buscar abonados que coincidan con la consulta
      const abonados = await Abonado.find(query);

      if (abonados.length > 0) {
        res.status(200).json(abonados);
      } else {
        res.status(404).json({ message: "No se encontraron abonados" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },
};

export default AbonadoController;
