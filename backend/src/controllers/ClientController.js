import { where } from "sequelize";
import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Movement from "../models/Movement.js";

class ClientController {
  // LIST ALL CLIENTS
  static async findAll(req, res) {
    const clients = await Client.findAll({
      include: Movement,
      order: [
        ["id", "DESC"],
        [Movement, "id", "DESC"],
      ],
    });
    return res.json(clients);
  }

  // LIST ALL ACTIVE CLIENTS
  static async findActives(req, res) {
    const clients = await Client.findAll({
      where: { active: true },
      include: Movement,
    });
    return res.json(clients);
  }

  // LIST ALL INACTIVE CLIENTS
  static async findInactives(req, res) {
    const inactiveClients = await Client.findAll({
      where: { active: false },
      include: Movement,
    });
    return res.json(inactiveClients);
  }

  // LIST AN SPECIFIC CLIENT
  static async findById(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id, {
      include: { model: Movement },
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

  // INACTIVATE CLIENT
  static async inactivate(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(422).json({
        message: "ID é obrigatório!",
      });
    }

    const foundedClient = await Client.findByPk(id);

    if (!foundedClient) {
      return res.status(422).json({ message: "Cliente não encontrado!" });
    }

    const inactiveClient = await foundedClient.update({
      active: !foundedClient.active,
    });

    if (!inactiveClient) {
      return res.status(500).json({
        message: "Erro ao desativar cliente!",
      });
    }

    return res.status(201).json(inactiveClient);
  }

  // CREATE LOAN
  static async createLoan(req, res) {
    const { clientId, amount, portion, paid = 0 } = req.body;

    if (!clientId || !amount || !portion) {
      return res.status(422).json({
        message: "Cliente, Empréstimo e Parcela são obrigatórios!",
      });
    }

    const foundedClient = await Client.findByPk(clientId);

    if (!foundedClient) {
      return res.status(422).json({
        message: "Cliente não encontrado!",
      });
    }

    // SE O CLIENTE JÁ TEM EMPRÉSIMO, NÃO DEIXA CRIAR OUTRO!
    if (foundedClient?.totalInitial || foundedClient?.movements?.[0]) {
      return res
        .status(422)
        .json({ message: "Erro! Este cliente já contratou empréstimo!" });
    }

    // CRIA O EMPRÉSTIMO (SETA OS VALORES P/ CADA ATRIBUTO)
    const updatedClient = await foundedClient.update({
      totalInitial: amount,
      total: amount - paid,
      paidInitial: paid,
      paid: paid,
      portion: portion,
    });

    if (!updatedClient) {
      return res.status(500).json({
        message: "Erro ao contratar empréstimo!",
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
