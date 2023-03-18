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
    if (foundedClient?.remainder === 0 && type === "input") {
      return res
        .status(422)
        .json({ message: "Erro! Cliente já quitou todos os débitos!" });
    }

    // NÃO EFETUA UM PAGAMENTO CUJO VALOR SEJA MAIOR QUE O DÉBITO
    if (amount > foundedClient.remainder && type === "input") {
      return res.status(422).json({
        message:
          "Erro! Valor informado para abate é maior que o débito do cliente!",
      });
    }

    // create new movement (OKKKKK)
    const createdMovement = await Movement.create({
      clientId,
      amount,
      type,

      previous: foundedClient?.total - foundedClient?.paid,
      interest: (foundedClient?.total - foundedClient?.paid) * 0.1,
      remainder:
        type === "input"
          ? foundedClient?.total -
            foundedClient?.paid +
            (foundedClient?.total - foundedClient?.paid) * 0.1 -
            amount
          : foundedClient?.total -
            foundedClient?.paid +
            (foundedClient?.total - foundedClient?.paid) * 0.1 +
            amount,
    });

    // updated client
    const updatedClient = await foundedClient.update({
      total:
        type === "input"
          ? foundedClient?.total - amount
          : foundedClient?.total + amount,
      paid: 0,
      remainder: createdMovement?.remainder,
    });

    if (!createdMovement) {
      return res.status(422).json({ message: "Erro ao gerar movimentação!" });
    }

    return res.json(createdMovement);
  }
}

export default MovementController;
