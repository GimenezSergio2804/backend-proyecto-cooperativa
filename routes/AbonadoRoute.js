import express from "express";
import abonadosController from "../controllers/AbonadoController.js";

const router = express.Router();

// Rutas para CRUD de abonados
router.post("/crear-abonado", abonadosController.crearAbonado);
router.get("/obtener-abonados", abonadosController.obtenerAbonados);
router.get("/obtener-abonadoId/:id", abonadosController.obtenerAbonadoPorId);
router.put("/actualizar-abonado/:id", abonadosController.actualizarAbonado);
router.delete("/eliminar-abonado/:id", abonadosController.eliminarAbonado);

export default router;
