import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import authMiddleware from "../middleware/autentificacionMiddleware.js";

// modulo routing de express
const router = express.Router();

// login
router.post("/login", UsuarioController.login);
// obtener usuarios
router.get("/obtener-usuarios", UsuarioController.obtenerUsuarios);
// buscar por id
router.get("/obtener-usuario/:id", UsuarioController.obtenerUsuarioId);
// crear usuario
router.post("/crear-usuario", UsuarioController.crearUsuario);
// actualizar usuario
router.put("/actualizar-usuario/:id", UsuarioController.actualizarUsuario);
// eliminar usuario
router.delete("/eliminar-usuario/:id", UsuarioController.eliminarUsuario); // esta funcion no se va a utilizar, los usuarios se bloquean, no se eliminan

export default router;
