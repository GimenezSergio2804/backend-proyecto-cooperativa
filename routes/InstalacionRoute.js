import express from "express";
import InstalacionController from "../controllers/InstalacionController.js";

const router = express.Router();

// crear instalación
router.post("/crear-instalacion", InstalacionController.crearInstalacion);
// obtener todas las instalaciones
router.get(
  "/obtener-instalacionesActivas",
  InstalacionController.obtenerInstalaciones
);
// obtener instalación por ID
router.get(
  "/obtener-instalacionId/:id",
  InstalacionController.obtenerInstalacionPorId
);
// actualizar instalación
router.put(
  "/actualizar-instalacion/:id",
  InstalacionController.actualizarInstalacion
);
// eliminar instalación
router.delete(
  "/eliminar-instalacion/:id",
  InstalacionController.eliminarInstalacion
);

export default router;
