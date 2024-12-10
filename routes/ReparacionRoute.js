import express from "express";
import reparacionController from "../controllers/ReparacionController.js";

const router = express.Router();

// Rutas para CRUD de reparaciones
router.post("/crear-reparacion", reparacionController.crearReparacion);
router.get("/obtener-reparaciones", reparacionController.obtenerReparaciones);
router.get(
  "/obtener-reparacionId/:id",
  reparacionController.obtenerReparacionPorId
);
router.put(
  "/actualizar-reparacion/:id",
  reparacionController.actualizarReparacion
);
router.delete(
  "/eliminar-reparacion/:id",
  reparacionController.eliminarReparacion
);

export default router;
