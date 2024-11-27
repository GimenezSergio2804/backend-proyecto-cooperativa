import Plan from "../models/PlanModel.js";

const PlanController = {
  obtenerPlanes: async (req, res) => {
    try {
      const planes = await Plan.find({});
      res.status(200).json(planes);
    } catch (error) {
      res
        .status(500)
        .json({ mensajeError: "Error al obtener los planes", error });
    }
  },

  crearPlan: async (req, res) => {
    const { nombre, velocidadSubida, velocidadBajada, valor } = req.body;
    try {
      const planNuevo = await Plan.create({
        nombre,
        velocidadSubida,
        velocidadBajada,
        valor,
      });
      res.status(201).json({ mensaje: "Plan creado con Exito", planNuevo });
    } catch (error) {
      res.status(400).json({ mensajeError: "Error al cargar el plan", error });
    }
  },

  obtenerPlanId: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.params);
      const planID = await Plan.findById(id);

      if (!planID) {
        res.status(404).json({ mensajeError: "Plan no encontrado" });
      }

      res.status(200).json(planID);
    } catch (error) {
      res.status(400).json({ mensajeError: "Error al buscar el plan", error });
    }
  },
  actualizarPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, velocidadSubida, velocidadBajada, valor } = req.body;

      const plan = await Plan.findByIdAndUpdate(
        id,
        { nombre, velocidadSubida, velocidadBajada, valor },
        { new: true }
      );

      if (!plan) {
        res.status(400).json({ mensajeError: "Plan no encontrado" });
      }

      res.json({ mensaje: "Plan Actualizado", plan });
    } catch (error) {
      res.satatus(404).json({ mensajeError: "Error al actualizar el plan" });
    }
  },
  eliminarPlan: async (req, res) => {
    try {
      const { id } = req.params;

      const plan = await Plan.findByIdAndDelete(id);

      if (!plan) {
        res.status(400).json({ mensajeError: "Plan no encontrado" });
      }

      res.json({ mensaje: "Plan Eliminado", plan });
    } catch (error) {
      res.status(404).json({ mensajeError: "Error al eliminar el plan" });
    }
  },
};

export default PlanController;
