import connection from "../database/connection.js";
import Loan from "../models/Loan.js";

class LoanController {
  // LIST ALL LOANS
  static async findAll(req, res) {
    const loans = await Loan.findAll();
    return res.json({ status: "success", data: loans });
  }
}

export default LoanController;
