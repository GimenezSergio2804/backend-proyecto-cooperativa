import Usuario from "../models/UsuarioModel.js"; // Importamos el modelo de usuario
import bcrypt from "bcryptjs"; // libreria para generar token para autentificacion
import jwt from "jsonwebtoken"; // libreria para generar token para autentificacion

const UsuarioController = {
  login: async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body; // tomamos los datos del body

    try {
      // buscamos el usuario en la BD
      const usuario = await Usuario.findOne({ email });
      // como condicion utilizamos si el usuario existe
      if (!usuario) {
        return res.status(401).json({ mensajeError: "Usuario no encontrado" });
      }

      // comparamos la contraseña (BD y body)
      const passWordCorrecto = await bcrypt.compare(password, usuario.password);

      // si la contraseña es incorrecta
      if (!passWordCorrecto) {
        return res.status(401).json({ mensajeError: "Contraseña Incorrecta" });
      }

      // generamos un token y le damos un tiempo determinado para estar dentro del sistema
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        mensaje: "Login exitoso",
        token,

        usuario: {
          id: usuario._id,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          rol: usuario.rol,
          perfil: usuario.perfil,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensajeError: "Error al procesar la solicitud" });
    }
  },

  crearUsuario: async (req, res) => {
    try {
      const {
        nombres,
        apellidos,
        legajo,
        sector,
        email,
        telefono,
        rol,
        password,
      } = req.body;

      // verificamos si el mail o legajo ya estan registrados
      const existeEmail = await Usuario.findOne({ email });
      const existeLegajo = await Usuario.findOne({ legajo });

      if (existeEmail || existeLegajo) {
        return res.status(400).json({
          mensajeError: "El email o el legajo ya estan registrados",
        });
      }

      // encryptamos la contraseña
      const hash = await bcrypt.hash(password, 10);

      // crear usuario
      const usuario = new Usuario({
        nombres,
        apellidos,
        legajo,
        sector,
        email,
        telefono,
        rol,
        password: hash,
      });
      await usuario.save();
      res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al crear el usuario", error });
    }
  },

  obtenerUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.find({});
      res.json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener todos los usuarios", error });
    }
  },

  actualizarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombres, apellidos, sector, email, telefono, rol, activo } =
        req.body;

      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { nombres, apellidos, sector, email, telefono, rol, activo },
        { new: true } // me devuelve el documento actualizado, y no el anterior
      );

      if (!usuario) {
        return res.status(404).json({ mensajeError: "Usuario no encontrado" });
      }

      res.json({ mensaje: "Usuario actualizado", usuario });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al actualizar el usuario", error });
    }
  },

  eliminarUsuario: async (req, res) => {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByIdAndDelete(id);

      if (!usuario) {
        return res.status(404).json({ mensajeError: "Usuario No encontrado" });
      }

      res.json({ mensaje: "Usuario Eliminado" });
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al eliminar el usuario", error });
    }
  },
};

export default UsuarioController;
