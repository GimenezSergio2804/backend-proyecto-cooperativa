import express from "express";
import ServicioController from "../controllers/ServicioController.js";

// modulo routing de express
const router = express.Router();

// crear
router.post("/crear-servicio", ServicioController.crearServicio);
// obtener-servicios
router.get("/obtener-servicios", ServicioController.obtenerServicios);

export default router;
