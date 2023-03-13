import { where } from "sequelize";
import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Loan from "../models/Loan.js";

class ClientController {
  // LIST ALL CLIENTS
  static async findAll(req, res) {
    const clients = await Client.findAll({
      include: Loan,
    });
    return res.json({ status: "success", data: clients });
  }

  // LIST ALL INACTIVE CLIENTS
  static async findInactives(req, res) {
    const inactiveClients = await Client.findAll({
      where: { active: false },
      include: Loan,
    });
    return res.json({ status: "success", data: inactiveClients });
  }

  // LIST AN SPECIFIC CLIENT
  static async findById(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id, {
      include: Loan,
    });

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
        message: "Error registering client!",
      });
    }

    return res.status(201).json({ status: "success", data: createdClient });
  }

  // UPDATE CLIENT
  static async update(req, res) {
    const { id, name, phone, address } = req.body;

    if (!id || !name || !address) {
      return res.status(422).json({
        status: "error",
        message: "ID, Name and Address are required!",
      });
    }

    const foundedClient = await Client.findByPk(id);

    if (!foundedClient) {
      return res
        .status(422)
        .json({ status: "error", message: "Client not found!" });
    }

    const updatedClient = await foundedClient.update({
      name,
      phone,
      address,
    });

    if (!updatedClient) {
      return res.status(500).json({
        status: "error",
        message: "Error editing client!",
      });
    }

    return res.status(201).json({ status: "success", data: updatedClient });
  }

  // INACTIVATE CLIENT
  static async inactivate(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(422).json({
        status: "error",
        message: "ID is required!",
      });
    }

    const foundedClient = await Client.findByPk(id);

    if (!foundedClient) {
      return res
        .status(422)
        .json({ status: "error", message: "Client not found!" });
    }

    const inactiveClient = await foundedClient.update({
      active: !foundedClient.active,
    });

    if (!inactiveClient) {
      return res.status(500).json({
        status: "error",
        message: "Error deactivating client!",
      });
    }

    return res.status(201).json({ status: "success", data: inactiveClient });
  }
}

export default ClientController;
