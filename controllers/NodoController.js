import Nodo from "../models/NodoModel.js";

const NodoController = {
  obtenerNodos: async (req, res) => {
    try {
      const nodos = await Nodo.find({});
      res.status(200).json(nodos);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener los nodos", error });
    }
  },

  crearNodo: async (req, res) => {
    const { nombre } = req.body;
    try {
      const nodoNuevo = await Nodo.create({ nombre });
      res.status(201).json({ mensaje: "Nodo Creado con exito", nodoNuevo });
    } catch (error) {
      res.status(400).json({ mensajeError: "Error al cargar el nodo", error });
    }
  },

  obtenerNodoId: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.params);
      const nodoID = await Nodo.findById(id);

      if (!nodoID) {
        res.status(404).json({ mensajeError: "Nodo no encontrado" });
      }

      res.status(200).json(nodoID);
    } catch (error) {
      res.status(400).json({ mensajeError: "Error al buscar el nodo", error });
    }
  },
  actualizarNodo: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;

      const nodo = await Nodo.findByIdAndUpdate(id, { nombre }, { new: true });

      if (!nodo) {
        res.status(400).json({ mensajeError: "Nodo no encontrado" });
      }

      res.json({ mensaje: "Nodo Actualizado", nodo });
    } catch (error) {
      res.satatus(404).json({ mensajeError: "Error al actualizar el nodo" });
    }
  },
  eliminarNodo: async (req, res) => {
    try {
      const { id } = req.params;

      const nodo = await Nodo.findByIdAndDelete(id);

      if (!nodo) {
        res.status(400).json({ mensajeError: "Nodo no encontrado" });
      }

      res.json({ mensaje: "Nodo Eliminado", nodo });
    } catch (error) {
      res.status(404).json({ mensajeError: "Error al eliminar el nodo" });
    }
  },
};

export default NodoController;
