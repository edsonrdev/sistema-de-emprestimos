import { where } from "sequelize";
import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Loan from "../models/Loan.js";
import Movement from "../models/Movement.js";
import { addMonths } from "date-fns";

class LoanController {
  static async create(req, res) {
    const { clientId, portion } = req.body;
    let { value } = req.body;

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
    let initialValue = value;
    let remainderValue = 0;

    for (let count = 1; value >= portion; count++) {
      remainderValue = value + value * 0.1 - portion;
      await Movement.create({
        loanId: createdLoan.id,
        expireDate: addMonths(today, count),
        expired: false,
        remainderValue,
        current: count === 1 ? true : false,
      });

      value = remainderValue;
    }

    let movements = await Movement.findAll();

    for (let i = 0; i < movements.length; i++) {
      movements[i].previousValue =
        i === 0
          ? initialValue
          : i === 1
          ? movements[0].remainderValue
          : movements[i - 1].remainderValue;

      movements[i].save();
    }

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
