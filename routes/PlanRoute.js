import express from "express";
import PlanController from "../controllers/PlanController.js";

// modulo routing de express
const router = express.Router();

// crear
router.post("/crear-plan", PlanController.crearPlan);
// obtener
router.get("/obtener-planes", PlanController.obtenerPlanes);
// obtener por id
router.get("/obtener-planId/:id", PlanController.obtenerPlanId);
// editar
router.put("/actualizar-plan/:id", PlanController.actualizarPlan);
// eliminar
router.delete("/eliminar-plan/:id", PlanController.eliminarPlan);

export default router;
