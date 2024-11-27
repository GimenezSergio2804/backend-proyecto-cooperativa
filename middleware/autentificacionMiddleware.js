import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // obtenemos el token brindado por el header
  const authHeader = req.headers["authorization"];
  // para llevarlo a bearer Token
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(403).json({ mensajeError: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensajeError: "Token inválido" });
    }
    req.userId = decoded.id; // Almacenar el ID del usuario en la solicitud
    next(); // Pasar al siguiente middleware o ruta
  });
};

export default authMiddleware;
