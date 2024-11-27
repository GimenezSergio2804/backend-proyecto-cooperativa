import express from "express";
import NodoController from "../controllers/NodoController.js";

// modulo routing de express
const router = express.Router();

// crear
router.post("/crear-nodo", NodoController.crearNodo);
// obtener
router.get("/obtener-nodos", NodoController.obtenerNodos);
// obtener por id
router.get("/obtener-nodoId/:id", NodoController.obtenerNodoId);
// editar
router.put("/actualizar-nodo/:id", NodoController.actualizarNodo);
// eliminar
router.delete("/eliminar-nodo/:id", NodoController.eliminarNodo);

export default router;
