import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import authMiddleware from "../middleware/autentificacionMiddleware.js";

// modulo routing de express
const router = express.Router();

// login
router.post("/login", UsuarioController.login);
router.get("/usuario", authMiddleware, UsuarioController.devolverDatos);
// obtener usuarios
router.get("/obtener-usuarios", UsuarioController.obtenerUsuarios);
// buscar por id
router.get("/obtener-usuario/:id", UsuarioController.obtenerUsuarioId);
// obtener tecnicos activos
router.get("/obtener-tecnicos", UsuarioController.obtenerTecnicosActivos);
// crear usuario
router.post("/crear-usuario", UsuarioController.crearUsuario);
// actualizar usuario
router.put("/actualizar-usuario/:id", UsuarioController.actualizarUsuario);
// eliminar usuario
router.delete("/eliminar-usuario/:id", UsuarioController.eliminarUsuario); // esta funcion no se va a utilizar, los usuarios se bloquean, no se eliminan

export default router;
