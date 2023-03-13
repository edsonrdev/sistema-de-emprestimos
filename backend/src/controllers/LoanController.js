import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Loan from "../models/Loan.js";

class LoanController {
  // LIST ALL LOANS
  static async findAll(req, res) {
    const loans = await Loan.findAll();
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

  // CHANGE TOTAL LOAN
  static async changeTotal(req, res) {
    const { id, amount, type } = req.body;

    if (!id || !amount) {
      return res
        .status(422)
        .json({ status: "error", message: "All fields are required!" });
    }

    const loanFounded = await Loan.findByPk(id);

    if (!loanFounded) {
      return res
        .status(422)
        .json({ status: "error", message: "Loan not found!" });
    }

    const changedLoanTotal = await loanFounded.update({
      // type = 1 => decrease total amount
      // type = 0 => increase total amount
      total: type ? loanFounded.total + amount : loanFounded.total - amount,
      remainder: type
        ? loanFounded.remainder + amount
        : loanFounded.remainder - amount,
      paid: type ? loanFounded.paid : loanFounded.paid + amount,
    });

    if (!changedLoanTotal) {
      return res.status(422).json({
        status: "error",
        message: "Error when changing loan total!",
      });
    }

    return res.json(changedLoanTotal);
  }
}

export default LoanController;
