import { where } from "sequelize";
import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Loan from "../models/Loan.js";
import Movement from "../models/Movement.js";
import { addDays } from "date-fns";
// import addDays from "date-fns/addDays";

class LoanController {
  static async create(req, res) {
    const { clientId, portion } = req.body;
    let { value } = req.body;

    let remainderValue = 0;

    if (!clientId || !value || !portion) {
      return res.status(422).json({
        message: "Empréstimo e Parcela são obrigatórios!",
      });
    }

    const foundedClient = await Client.findByPk(clientId);

    if (!foundedClient) {
      return res.status(422).json({ message: "Cliente não encontrado!" });
    }

    const createdLoan = await Loan.create({
      clientId,
      value: +value,
      portion: +portion,
    });

    if (!createdLoan) {
      return res.status(500).json({
        message: "Erro ao criar empréstimo!",
      });
    }

    let count = 1;
    let today = new Date();

    // // criar as movimentações
    while (value >= portion) {
      remainderValue = value + value * 0.1 - portion;

      // ...
      let movement = await Movement.create({
        loanId: createdLoan.id,
        expireDate: addDays(today, count * 30),
        expired: false,
        remainderValue,
      });

      value = remainderValue;
      count++;
    }

    // count = 0;

    return res.status(201).json(createdLoan);
  }

  static async findAll(req, res) {
    const loans = await Loan.findAll({
      include: Movement,
    });
    return res.json(loans);
  }
}

export default LoanController;
