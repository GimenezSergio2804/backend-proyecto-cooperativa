import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_NAME, {});
    console.log(`MongoDB conectado: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión: ${error.message}`);
    process.exit(1); // Detiene la ejecución si hay error
  }
};

export default conectarDB;
