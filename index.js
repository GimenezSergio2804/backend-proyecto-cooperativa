// utilizamos ECMA en vez de common JS para importar, para anularlo cambiarlo en el type de packajson
import express from "express"; // framework para creacion de proyectos (minimalista)
import dotenv from "dotenv"; // variables de entorno
import conectarDB from "./config/mongodb.js"; // importacion de la base de datos
import cors from "cors"; // no es necesario al menos que tenga front

import UsuarioRoute from "./routes/UsuarioRoute.js";
import CalleRoute from "./routes/CalleRoute.js";
import OnuRoute from "./routes/OnuRoute.js";
import CuadrillaRoute from "./routes/CuadrillaRoute.js";
import PlanRoute from "./routes/PlanRoute.js";
import NodoRoute from "./routes/NodoRoute.js";
import AbonadoRoute from "./routes/AbonadoRoute.js";
import CtoRoute from "./routes/CtoRoute.js";
import FibraRoute from "./routes/FibraRoute.js";

// cargamos las variables de entorno
dotenv.config();

// conexion a base de datos
conectarDB();

// crear la app
const app = express();

// evitar cors
app.use(cors());

// Middleware para leer JSON en las solicitudes
app.use(express.json());

// Routing
// Prueba
app.get("/test", (req, res) => {
  res.send("Estas dentro del sistema");
});

// usuario
app.use("/api/usuario", UsuarioRoute);
// calle
app.use("/api/calle", CalleRoute);
// onu
app.use("/api/onu", OnuRoute);
// cuadrilla
app.use("/api/cuadrilla", CuadrillaRoute);
// plan
app.use("/api/plan", PlanRoute);
// nodo
app.use("/api/nodo", NodoRoute);
// abonado
app.use("/api/abonado", AbonadoRoute);
// cto
app.use("/api/cto", CtoRoute);
// fibra
app.use("/api/fibra", FibraRoute);

// Iniciar el servidor | para este se necesitan dos cosas importantes, definir puerto y arrancar la app

// 1) definimos puerto, lo va a buscar a traves de las variables de entorno. sino lo encuentra usa el 3000
const PORT = process.env.PORT || 3000;
// 2) arrancar la app
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
