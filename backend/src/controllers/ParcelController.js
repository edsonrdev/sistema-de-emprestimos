import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Parcel from "../models/Parcel.js";

class ParcelController {
  // LIST ALL PARCELS
  static async findAll(req, res) {
    const parcels = await Parcel.findAll({
      order: [["id", "ASC"]],
    });
    return res.json(parcels);
  }

  // CREATE A NEW PARCEL
  // static async create(req, res) {
  //   const { clientId, amount, type } = req.body;

  //   if (!clientId || !amount || !type) {
  //     return res.status(422).json({
  //       message:
  //         "ID do Cliente, Valor e Tipo de Movimentação são obrigatórios!",
  //     });
  //   }

  //   const client = await Client.findByPk(clientId);

  //   if (!client) {
  //     return res.status(422).json({ message: "Cliente não encontrado!" });
  //   }

  //   // NÃO DEIXAR CRIAR MOVIMENTAÇÃO SE O CLIENTE AINDA TEM UM EMPRÉSTIMO
  //   if (client?.totalInitial === 0) {
  //     return res
  //       .status(422)
  //       .json({ message: "Erro! Contrate um empréstimo antes!" });
  //   }

  //   // NÃO DEIXA O CLIENTE EFETUAR UM PAGAMENTO SE ELE NÃO TEM MAIS DÉBITO ALGUM
  //   if (type === "input" && client?.total === 0) {
  //     return res
  //       .status(422)
  //       .json({ message: "Erro! Cliente já quitou todos os débitos!" });
  //   }

  //   // NÃO EFETUA UM PAGAMENTO CUJO VALOR SEJA MAIOR QUE O DÉBITO
  //   if (type === "input" && amount > client.total) {
  //     return res.status(422).json({
  //       message:
  //         "Erro! Valor informado para abate é maior que o débito do cliente!",
  //     });
  //   }

  //   let movementRemainder;
  //   let clientTotal;

  //   if (type === "input") {
  //     if (amount === client.total) {
  //       movementRemainder = 0;
  //     } else {
  //       movementRemainder =
  //         client.total +
  //         client.total * client.interestRate -
  //         amount;
  //     }
  //   } else {
  //     movementRemainder =
  //       client.total +
  //       client.total * client.interestRate +
  //       amount;
  //   }

  //   // CRIA NOVA MOVIMENTAÇÃO
  //   const createdMovement = await Parcel.create({
  //     clientId,
  //     amount,
  //     type,

  //     previous: client.total.toFixed(2),
  //     interest: (client.total * client.interestRate).toFixed(2),
  //     remainder: movementRemainder.toFixed(2),
  //     interestRatePrevious: client.interestRate,
  //   });

  //   if (type === "input") {
  //     if (amount === client.total) {
  //       clientTotal = 0;
  //     } else {
  //       clientTotal =
  //         client.total +
  //         client.total * client.interestRate -
  //         amount;
  //     }
  //   } else {
  //     clientTotal =
  //       client.total +
  //       client.total * client.interestRate +
  //       amount;
  //   }

  //   // updated client
  //   const updatedClient = await client.update({
  //     total: clientTotal.toFixed(2),
  //   });

  //   if (!createdMovement) {
  //     return res.status(422).json({ message: "Erro ao gerar parcelas!" });
  //   }

  //   return res.json(createdMovement);
  // }
}

export default ParcelController;
