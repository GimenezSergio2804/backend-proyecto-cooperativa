import express from "express";
import CuadrillaController from "../controllers/CuadrillaController.js";

const router = express.Router();

// crear una cuadrilla
router.post("/crear-cuadrilla", CuadrillaController.crearCuadrilla);
// obtener todas als cuadrillas
router.get("/obtener-cuadrillas", CuadrillaController.obtenerCuadrillas);

export default router;
