import express from "express";
import CalleController from "../controllers/CalleController.js";

// modulo routing de express
const router = express.Router();

// crear calle
router.post("/crear-calle", CalleController.crearCalle);
// obtener calles
router.get("/obtener-calles", CalleController.obtenerCalles);
// obtener calle por id
router.get("/obtener-calleId/:id", CalleController.obtenerCalleId);
// editar calle
router.put("/actualizar-calle/:id", CalleController.actualizarCalle);
// eliminar calle
router.delete("/eliminar-calle/:id", CalleController.eliminarCalle);

export default router;
