import connection from "../database/connection.js";
import Loan from "../models/Loan.js";
import Movement from "../models/Movement.js";

class MovementController {
  // LIST ALL MOVEMENTS
  static async findAll(req, res) {
    const movements = await Movement.findAll();
    return res.json(movements);
  }

  // CREATE A NEW MOVEMENT
  static async create(req, res) {
    const { loanId, amount, type } = req.body;
    // console.log(loanId, amount, type);

    if (!loanId || !amount || !type) {
      return res.status(422).json({ message: "All fields are requireds!" });
    }

    const loan = await Loan.findByPk(loanId);

    if (!loan) {
      return res.status(422).json({ message: "Loan not found!" });
    }

    // create new movement
    const createdMovement = await Movement.create({
      loanId,
      amount,
      type,
    });

    // update loan
    const updatedLoan = await loan.update({
      total: type === "output" ? loan.total + amount : loan.total,
      paid: type === "input" ? loan.paid + amount : loan.paid,
      remainder: type === "input" ? loan.total - amount : loan.total + amount,
    });

    if (!createdMovement) {
      return res.status(422).json({ message: "Error registering movement!" });
    }

    return res.json(createdMovement);
  }
}

export default MovementController;
