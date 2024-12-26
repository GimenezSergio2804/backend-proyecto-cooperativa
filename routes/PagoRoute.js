import express from "express";
import pagoController from "../controllers/pagoController.js";

const router = express.Router();

router.post("/crear-pago", pagoController.crearPago);
router.get("/obtener-pagos", pagoController.obtenerPagos);
router.get("/estado/false", pagoController.obtenerPagosEstadoFalse);
router.get("/estado/true", pagoController.obtenerPagosEstadoTrue);
router.get(
  "/estado/falsepaginado",
  pagoController.obtenerPagosEstadoFalsePaginado
);
router.get(
  "/estado/truepaginado",
  pagoController.obtenerPagosEstadoTruePaginado
);
router.get("/obtener-pagoId/:id", pagoController.obtenerPagoPorId);
router.get(
  "/obtener-pagos-estado-false",
  pagoController.obtenerPagosEstadoFalse
);
router.get("/comprobante/:id", pagoController.comprobanteId);
router.put("/actualizar-pago/:id", pagoController.actualizarPago);
router.delete("/eliminar-pago/:id", pagoController.eliminarPago);
router.patch("/estado-pago/:id/estado", pagoController.cambiarEstado);

export default router;
