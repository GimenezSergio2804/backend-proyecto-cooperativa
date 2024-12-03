import express from "express";
import CuadrillaController from "../controllers/CuadrillaController.js";

const router = express.Router();

// crear una cuadrilla
router.post("/crear-cuadrilla", CuadrillaController.crearCuadrilla);
// obtener todas als cuadrillas
router.get("/obtener-cuadrillas", CuadrillaController.obtenerCuadrillas);
// eliminar tecnico de una cuadrilla
router.delete(
  "/:cuadrillaId/tecnicos/:tecnicoId",
  CuadrillaController.eliminarTecnicoDeCuadrilla
);
// eliminar cuadrilla
// router.delete("/eliminar-cuadrilla/:id", CuadrillaController.)

export default router;
