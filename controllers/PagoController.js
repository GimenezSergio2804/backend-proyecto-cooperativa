import Pago from "../models/PagoModel.js";

const pagoController = {
  // Crear un nuevo pago
  crearPago: async (req, res) => {
    try {
      const nuevoPago = new Pago(req.body);
      const pagoGuardado = await nuevoPago.save();
      res
        .status(201)
        .json({ mensaje: "Pago creado correctamente", pagoGuardado });
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al crear el pago", error });
    }
  },

  // Obtener todos los pagos
  obtenerPagos: async (req, res) => {
    try {
      const pagos = await Pago.find();
      res.status(200).json(pagos);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener los pagos", error });
    }
  },

  // Obtener un pago por ID
  obtenerPagoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const pago = await Pago.findById(id);

      if (!pago) {
        return res.status(404).json({ mensajeError: "Pago no encontrado" });
      }

      res.status(200).json(pago);
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al obtener el pago", error });
    }
  },

  // Actualizar un pago
  actualizarPago: async (req, res) => {
    try {
      const { id } = req.params;
      const pagoActualizado = await Pago.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!pagoActualizado) {
        return res.status(404).json({ mensajeError: "Pago no encontrado" });
      }

      res
        .status(200)
        .json({ mensaje: "Pago actualizado correctamente", pagoActualizado });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al actualizar el pago", error });
    }
  },

  // Eliminar un pago
  eliminarPago: async (req, res) => {
    try {
      const { id } = req.params;
      const pagoEliminado = await Pago.findByIdAndDelete(id);

      if (!pagoEliminado) {
        return res.status(404).json({ mensajeError: "Pago no encontrado" });
      }

      res.status(200).json({ mensaje: "Pago eliminado correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al eliminar el pago", error });
    }
  },

  // Cambiar el estado de un pago a true
  cambiarEstado: async (req, res) => {
    try {
      const { id } = req.params;
      const pago = await Pago.findById(id);

      if (!pago) {
        return res.status(404).json({ mensajeError: "Pago no encontrado" });
      }

      pago.estado = true;
      const pagoActualizado = await pago.save();

      res
        .status(200)
        .json({ mensaje: "Estado cambiado a true", pagoActualizado });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al cambiar el estado", error });
    }
  },
};

export default pagoController;
