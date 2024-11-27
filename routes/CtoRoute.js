import express from "express";
import ctoController from "../controllers/CtoController.js";

const router = express.Router();

// Rutas para CRUD de CTOs
router.post("/crear-cto", ctoController.crearCto);
router.get("/obtener-ctos", ctoController.obtenerCtos);
router.get("/obtener-ctoId/:id", ctoController.obtenerCtoPorId);
router.put("/actualizar-cto/:id", ctoController.actualizarCto);
router.delete("/eliminar-cto/:id", ctoController.eliminarCto);

export default router;
