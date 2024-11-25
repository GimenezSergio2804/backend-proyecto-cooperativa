import express from "express";
import fibraController from "../controllers/FibraController.js";
const router = express.Router();

router.post("/crear-fibra", fibraController.crearFibra);
router.get("/obtener-fibras", fibraController.obtenerFibras);
router.get(
  "obtener-fibraNumeracion/:numeracion",
  fibraController.obtenerFibraPorNumeracion
);
router.put(
  "/actualizar-fibraNumeracion/:numeracion",
  fibraController.actualizarFibra
);
router.delete(
  "/eliminar-fibraNumeracion/:numeracion",
  fibraController.eliminarFibra
);

export default router;
