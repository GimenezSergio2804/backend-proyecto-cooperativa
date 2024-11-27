import Onu from "../models/OnuModel.js";

const OnuController = {
  crearOnu: async (req, res) => {
    try {
      const { id_onu, serial, admin } = req.body;

      const existeSerial = await Onu.findOne({ serial });
      const existeIdOnu = await Onu.findOne({ id_onu });

      if (existeSerial || existeIdOnu) {
        res
          .status(400)
          .json({ mensajeError: "Ya existe una Onu con ese GPON o id de ONU" });
      }

      const contra_wifi = serial.slice(-8);

      const nuevaOnu = new Onu({
        id_onu,
        serial,
        admin,
        contra_wifi,
      });
      await nuevaOnu.save();
      res.status(201).json({ mensaje: "Onu creada exitosamente", nuevaOnu });
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al crear la Onu", error });
    }
  },

  obtenerOnus: async (req, res) => {
    try {
      const onus = await Onu.find({});
      res.status(200).json(onus);
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al obtener las Onus" });
    }
  },

  actualizarOnu: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_onu, serial, admin, contra_wifi, estado, descripcion_falla } =
        req.body;
      const onuActualizada = await Onu.findByIdAndUpdate(
        id,
        { id_onu, serial, admin, contra_wifi, estado, descripcion_falla },
        { new: true }
      );

      if (!onuActualizada) {
        res.status(404).json({ mensajeError: "No se encontro la Onu" });
      }

      res.json({ mensaje: "Onu actualizada" });
    } catch (error) {
      res.status(500).json({ mensajeError: "Error al intentar de actualizar" });
    }
  },

  eliminarOnu: async (req, res) => {},
};

export default OnuController;
