import connection from "../database/connection.js";
import Client from "../models/Client.js";

class ClientController {
  // LISTA ALL CLIENTS
  static async all(req, res) {
    const clients = await Client.findAll();
    return res.json({ status: "success", data: clients });
  }

  // LIST AN SPECIFIC CLIENT
  static async find(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return res
        .status(422)
        .json({ status: "error", message: "Client not found!" });
    }

    return res.json({ status: "success", data: client });
  }

  // CREATE A NEW CLIENT
  static async create(req, res) {
    const { name, phone, address } = req.body;

    if (!name || !address) {
      return res
        .status(422)
        .json({ status: "error", message: "Name and Address are required!" });
    }

    const createdClient = await Client.create({
      name,
      phone,
      address,
    });

    if (!createdClient) {
      return res.status(500).json({
        status: "error",
        message: `Error registering client!`,
      });
    }

    return res.status(201).json({ status: "success", data: createdClient });
  }
}

export default ClientController;
