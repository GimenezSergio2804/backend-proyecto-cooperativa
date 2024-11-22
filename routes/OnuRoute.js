import express from "express";
import OnuController from "../controllers/OnuController.js";

const router = express.Router();

// crear onu
router.post("/crear-onu", OnuController.crearOnu);
// obtener onus
router.get("/obtener-onus", OnuController.obtenerOnus);
// editar onus
router.put("/actualizar-onu/:id", OnuController.actualizarOnu);
// eliminar onus
router.delete("/eliminar-onu/:id", OnuController.eliminarOnu);

export default router;
