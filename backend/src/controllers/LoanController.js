import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Loan from "../models/Loan.js";
import Movement from "../models/Movement.js";

class LoanController {
  // LIST ALL LOANS
  static async findAll(req, res) {
    const loans = await Loan.findAll({ include: Movement });
    return res.json(loans);
  }

  // CREATE A NEW LOAN
  static async create(req, res) {
    const { clientId, total, paid, portion } = req.body;

    if (!clientId || !total || !portion) {
      return res.status(422).json({
        status: "error",
        message: "Client ID, Total and Portion are required!",
      });
    }

    const client = await Client.findByPk(clientId, { include: Loan });

    if (!client) {
      return res
        .status(422)
        .json({ status: "error", message: "Client not found!" });
    }

    const hasOpenLoan = client?.loans.reduce(
      (acc, loan) => acc + loan.total,
      0
    );

    if (hasOpenLoan) {
      return res.status(422).json({
        status: "error",
        message: "The customer already has a contracted loan!",
      });
    }

    const createdLoan = await Loan.create({
      clientId,
      total,
      paid,
      portion,
    });

    if (!createdLoan) {
      return res.status(422).json({
        status: "error",
        message: "Error registering loan!",
      });
    }

    return res.json(createdLoan);
  }
}

export default LoanController;
