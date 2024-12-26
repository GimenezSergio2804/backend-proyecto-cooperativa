import Pago from "../models/PagoModel.js";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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

  // obtener pagos con estado false
  obtenerPagosEstadoFalse: async (req, res) => {
    try {
      const pagos = await Pago.find({ estado: false });
      res.status(200).json(pagos);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener los pagos", error });
    }
  },

  // obtener pagos con estado true
  obtenerPagosEstadoTrue: async (req, res) => {
    try {
      const pagos = await Pago.find({ estado: true });
      res.status(200).json(pagos);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener los pagos", error });
    }
  },

  // Función para obtener pagos paginados
  obtenerPagosEstadoFalsePaginado: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
      const pageSize = parseInt(req.query.pageSize) || 10; // Tamaño de la página (por defecto 10)

      // Obtener pagos con paginación
      const pagos = await Pago.find({ estado: false })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize) // Saltar los pagos anteriores
        .limit(pageSize); // Limitar la cantidad de pagos a la página actual
      console.log("Página:", page, "Tamaño de página:", pageSize);

      // Contar el total de pagos que cumplen la condición
      const totalPagos = await Pago.countDocuments({ estado: false });

      // Responder con los pagos y el total
      res.status(200).json({ pagos, totalPagos });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener los pagos", error });
    }
  },

  // obtener pagos con estado true paginada
  obtenerPagosEstadoTruePaginado: async (req, res) => {
    try {
      const pagos = await Pago.find({ estado: true });
      res.status(200).json(pagos);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener los pagos", error });
    }
  },

  comprobanteId: async (req, res) => {
    try {
      const pagoId = req.params.id;

      // Validar el ID
      if (!pagoId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send("ID inválido");
      }

      // Buscar el pago por ID
      const pago = await Pago.findById(pagoId);

      if (!pago) {
        return res.status(404).send("Pago no encontrado");
      }

      // Asegurarse de que `monto` sea un número
      const monto = parseFloat(pago.monto);

      if (isNaN(monto)) {
        return res.status(500).send("El monto no es válido");
      }

      // Generar el comprobante PDF
      const doc = new PDFDocument();
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);
      });

      // Ruta del logo
      const __filename = fileURLToPath(import.meta.url); // Ruta completa del archivo actual
      const __dirname = dirname(__filename); // Directorio del archivo actual
      const logoPath = path.join(__dirname, "../assets/logo.png");

      const createRecibo = (yOffset) => {
        // Insertar el logo
        doc.image(logoPath, 50, yOffset, { width: 60 });

        // Título del comprobante
        doc
          .fontSize(18)
          .text("Comprobante de Pago", 200, yOffset + 80, { align: "center" })
          .moveDown();

        // Fecha del recibo
        doc
          .fontSize(10)
          .font("Helvetica")
          .text(`Fecha: ${new Date().toLocaleString()}`, { align: "right" });

        // Datos del pago
        doc
          .fontSize(12)
          .font("Helvetica")
          .text(`N° de Recibo: ${pagoId}`, 50, yOffset + 120)
          .moveDown()
          .text(`Nombre: ${pago.nombre}`, 70) // Margen adicional para el texto
          .text(`DNI: ${pago.dni}`, 70)
          .text(`Celular: ${pago.contacto}`, 70)
          .text(`Asesor: ${pago.asesor || "N/A"}`, 70)
          .text(`Medio de Pago: ${pago.medio_de_pago}`, 70)
          .moveDown();

        // Monto del pago
        doc.text(`Monto: $${monto.toFixed(2)}`, 50, yOffset + 230);

        // Rectángulo para enmarcar los datos
        doc
          .rect(45, yOffset + 100, 500, 150) // Ajustado para cubrir los datos del recibo
          .stroke();

        // Mensaje de agradecimiento
        doc
          .fontSize(10)
          .text("Gracias por su pago.", 50, yOffset + 300, { align: "center" });
      };

      // Crear el primer recibo (parte superior)
      createRecibo(20);

      // Crear el segundo recibo (parte inferior)
      createRecibo(400);

      // Finalizar el PDF
      doc.end();
    } catch (error) {
      console.error("Error generando comprobante:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

export default pagoController;
