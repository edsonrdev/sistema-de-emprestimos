import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Movement from "../models/Movement.js";

class MovementController {
  // LIST ALL MOVEMENTS
  static async findAll(req, res) {
    const movements = await Movement.findAll();
    return res.json(movements);
  }

  // CREATE A NEW MOVEMENT
  static async create(req, res) {
    const { clientId, amount, type } = req.body;

    if (!clientId || !amount || !type) {
      return res
        .status(422)
        .json({ message: "ID do cliente, Valor e Tipo são obrigatórios!" });
    }

    const foundedClient = await Client.findByPk(clientId);

    if (!foundedClient) {
      return res.status(422).json({ message: "Cliente não encontrado!" });
    }

    if (!(foundedClient?.total > 0 || foundedClient?.movements?.[0])) {
      return res
        .status(422)
        .json({ message: "Erro! Contrate um empréstimo antes!" });
    }

    if (foundedClient.paid === foundedClient.total && type === "input") {
      return res
        .status(422)
        .json({ message: "Erro! O cliente não tem débitos!" });
    }

    if (amount > foundedClient.remainder && type === "input") {
      return res.status(422).json({
        message: "Erro! O débito é menor que o valor informado para abate!",
      });
    }

    // create new movement
    const createdMovement = await Movement.create({
      clientId,
      amount,
      type,
    });

    // updated client
    const updatedClient = await foundedClient.update({
      total:
        type === "output" ? foundedClient.total + amount : foundedClient.total,
      paid: type === "input" ? foundedClient.paid + amount : foundedClient.paid,
      remainder:
        type === "input"
          ? foundedClient.total - amount
          : foundedClient.total + amount,
    });

    if (!createdMovement) {
      return res.status(422).json({ message: "Erro ao gerar movimentação!" });
    }

    return res.json(createdMovement);
  }
}

export default MovementController;
