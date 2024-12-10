import express from "express";
import ServicioController from "../controllers/ServicioController.js";

// modulo routing de express
const router = express.Router();

// crear
router.post("/crear-servicio", ServicioController.crearServicio);
// obtener-servicios
router.get("/obtener-servicios", ServicioController.obtenerServicios);
// eliminar servicio
router.delete("/eliminar-servicio/:id", ServicioController.eliminarServicio);
// Ruta para obtener un servicio por ID
router.get("/obtener-servicioId/:id", ServicioController.getServicioById);
// // ruta para obtencion de datos de fibra
// router.get("/fibra_datos", ServicioController.fibra_datos);

// Ruta para actualizar un servicio
router.put("/actualizar-servicio/:id", ServicioController.updateServicio);
export default router;
