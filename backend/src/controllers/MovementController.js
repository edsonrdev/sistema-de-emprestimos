import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Movement from "../models/Movement.js";

class MovementController {
  // LIST ALL MOVEMENTS
  static async findAll(req, res) {
    const movements = await Movement.findAll({
      order: [["id", "DESC"]],
    });
    return res.json(movements);
  }

  // CREATE A NEW MOVEMENT
  static async create(req, res) {
    const { clientId, amount, type } = req.body;

    if (!clientId || !amount || !type) {
      return res.status(422).json({
        message:
          "ID do Cliente, Valor e Tipo de Movimentação são obrigatórios!",
      });
    }

    const foundedClient = await Client.findByPk(clientId);

    if (!foundedClient) {
      return res.status(422).json({ message: "Cliente não encontrado!" });
    }

    // NÃO DEIXAR CRIAR MOVIMENTAÇÃO SE O CLIENTE AINDA TEM UM EMPRÉSTIMO
    if (foundedClient?.initial === 0) {
      return res
        .status(422)
        .json({ message: "Erro! Contrate um empréstimo antes!" });
    }

    // NÃO DEIXA O CLIENTE EFETUAR UM PAGAMENTO SE ELE NÃO TEM MAIS DÉBITO ALGUM
    if (foundedClient?.total === 0 && type === "input") {
      return res
        .status(422)
        .json({ message: "Erro! Cliente já quitou todos os débitos!" });
    }

    // NÃO EFETUA UM PAGAMENTO CUJO VALOR SEJA MAIOR QUE O DÉBITO
    if (amount > foundedClient.total && type === "input") {
      return res.status(422).json({
        message:
          "Erro! Valor informado para abate é maior que o débito do cliente!",
      });
    }

    let movementRemainder;
    let clientTotal;

    if (type === "input" && amount === foundedClient.total) {
      movementRemainder = 0;
    } else if (type === "input") {
      movementRemainder = foundedClient.total * 1.1 - amount;
    } else {
      movementRemainder = foundedClient.total * 1.1 + amount;
    }

    // create new movement (OKKKKK)
    const createdMovement = await Movement.create({
      clientId,
      amount,
      type,

      previous: foundedClient.total.toFixed(2),
      interest: (foundedClient.total * 0.1).toFixed(2),
      remainder: movementRemainder.toFixed(2),
    });

    if (type === "input" && amount === foundedClient.total) {
      clientTotal = 0;
    } else if (type === "input") {
      clientTotal = foundedClient.total * 1.1 - amount;
    } else {
      clientTotal = foundedClient.total * 1.1 + amount;
    }

    // updated client
    const updatedClient = await foundedClient.update({
      paid:
        type === "input" && amount === foundedClient.total
          ? foundedClient.total + amount
          : foundedClient.paid,
      total: clientTotal.toFixed(2),
      // total:
      //   type === "input"
      //     ? foundedClient.total * 1.1 - amount
      //     : foundedClient.total * 1.1 + amount,

      // paid: type === "input" ? foundedClient.paid + amount : foundedClient.paid,
    });

    if (!createdMovement) {
      return res.status(422).json({ message: "Erro ao gerar movimentação!" });
    }

    return res.json(createdMovement);
  }
}

export default MovementController;
