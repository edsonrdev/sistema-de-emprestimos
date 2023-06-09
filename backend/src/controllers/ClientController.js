import { where } from "sequelize";
import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Loan from "../models/Loan.js";
import Parcel from "../models/Parcel.js";

class ClientController {
  // LIST ALL CLIENTS
  static async findAll(req, res) {
    const clients = await Client.findAll({
      include: Loan,
      order: [
        ["id", "DESC"],
        [Loan, "id", "ASC"],
      ],
    });

    if (!clients) {
      return res.json({ message: "Erro ao buscar clientes!" });
    }

    return res.json(clients);
  }

  // LIST AN SPECIFIC CLIENT
  static async findById(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id, {
      include: { all: true, nested: true },
      order: [[Loan, Parcel, "id", "ASC"]],
    });

    if (!client) {
      return res.status(422).json({ message: "Cliente não encontrado!" });
    }

    return res.json(client);
  }

  // CREATE A NEW CLIENT
  static async create(req, res) {
    const { name, phone, address } = req.body;

    if (!name || !address) {
      return res.status(422).json({
        message: "Nome e Endereço são obrigatórios!",
      });
    }

    const createdClient = await Client.create({
      name,
      phone,
      address,
    });

    if (!createdClient) {
      return res.status(500).json({
        message: "Erro salvar o cliente!",
      });
    }

    return res.status(201).json(createdClient);
  }

  // UPDATE CLIENT
  static async update(req, res) {
    const { id } = req.params;
    const { name, phone, address } = req.body;

    if (!id || !name || !address) {
      return res.status(422).json({
        message: "ID, Nome e Endereço são obrigatórios!",
      });
    }

    const foundedClient = await Client.findByPk(id);

    if (!foundedClient) {
      return res.status(422).json({ message: "Cliente não encontrado!" });
    }

    const updatedClient = await foundedClient.update({
      name,
      phone,
      address,
    });

    if (!updatedClient) {
      return res.status(500).json({
        message: "Erro ao atualizar cliente!",
      });
    }

    return res.status(201).json(updatedClient);
  }

  // ATUALIZA O VALOR DA TAXA DO EMPRÉSTIMO
  static async updateInterestRate(req, res) {
    const { clientId, interestRate } = req.body;

    if (!clientId || !interestRate) {
      return res.status(422).json({
        message: "Cliente e Taxa são obrigatórios!",
      });
    }

    const foundedClient = await Client.findByPk(clientId);

    if (!foundedClient) {
      return res.status(422).json({ message: "Cliente não encontrado!" });
    }

    if (interestRate < 1 || interestRate > 100) {
      return res.status(422).json({
        message: "Taxa está fora do intervalo aceitável!",
      });
    }

    const updatedClient = await foundedClient.update({
      interestRate: interestRate / 100,
    });

    if (!updatedClient) {
      return res.status(500).json({
        message: "Erro ao atualizar cliente!",
      });
    }

    return res.status(201).json(updatedClient);
  }
}

export default ClientController;
