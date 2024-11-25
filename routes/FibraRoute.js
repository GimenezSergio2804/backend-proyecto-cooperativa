import express from "express";
import fibraController from "../controllers/FibraController";
const router = express.Router();

router.post("/crear-fibra", crearFibra);
router.get("/obtener-fibras", obtenerFibras);
router.get("obtener-fibraNumeracion/:numeracion", obtenerFibraPorNumeracion);
router.put("/actualizar-fibraNumeracion/:numeracion", actualizarFibra);
router.delete("/eliminar-fibraNumeracion/:numeracion", eliminarFibra);

export default router;
