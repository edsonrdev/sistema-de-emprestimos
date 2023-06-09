import { where } from "sequelize";
import connection from "../database/connection.js";
import Client from "../models/Client.js";
import Loan from "../models/Loan.js";
import Parcel from "../models/Parcel.js";
import { addMonths } from "date-fns";

class LoanController {
  static async findAll(req, res) {
    const loans = await Loan.findAll({
      include: Parcel,
      order: [["id", "ASC"]],
    });
    return res.json(loans);
  }

  static async create(req, res) {
    // recebe os dados do frontend
    const { clientId, portion } = req.body;
    let { value } = req.body;

    // validação dos dados
    if (!clientId || !value || !portion) {
      return res
        .status(422)
        .json({ message: "Empréstimo e Parcela são obrigatórios!" });
    }

    // validação do cliente
    const client = await Client.findByPk(clientId, {
      include: Loan,
    });

    if (!client) {
      return res.status(422).json({ message: "Cliente não encontrado!" });
    }

    const clientHasLoans = client.loans.length;
    const clientHasOpenLoans = client.loans.some((loan) => !loan.finished);

    // impossibilita a criação de novo empréstimo, enquanto houver outro em aberto (não quitado)
    if (clientHasLoans && clientHasOpenLoans) {
      return res.status(422).json({
        message:
          "Não é possível contratar novo empréstimo, tendo um em aberto!",
      });
    }

    // cria o empréstimo vazio, sem parcelas
    const loan = await Loan.create({
      clientId,
      value: +value,
      portion: +portion,
    });

    if (!loan) {
      return res.status(500).json({ message: "Erro ao criar empréstimo!" });
    }

    let initialValue = value;
    let remainderValue = 0;

    // cria as parcelas
    for (let count = 1; value >= portion; count++) {
      remainderValue = value + value * 0.1 - portion;

      const parcel = await Parcel.create({
        loanId: loan.id,
        expireDate: addMonths(new Date(), count),
        expired: false,
        remainderValue,
        current: count === 1 ? true : false,
        previousValue: value,
      });

      value = remainderValue;
    }

    return res.status(201).json(loan);
  }

  static async toPay(req, res) {
    const { loanId, amount } = req.body;

    const loan = await Loan.findByPk(loanId, {
      // include: { all: true, nested: true },
      include: Parcel,
      order: [[Parcel, "id", "ASC"]],
    });

    // valida o empréstimo
    if (!loan) {
      return res.status(404).json({ message: "Empréstimo não encontrado!" });
    }

    // valida o valor a ser pago
    if (!amount || amount <= 0) {
      return res.status(422).json({
        message:
          "Valor a ser pago é obrigatório e não pode ser menor/igual a zero!",
      });
    }

    // pega todas as parcelas do empréstimo
    const parcels = loan.parcels;

    // obtém a parcela atual e as parcelas seguintes
    let currentParcel = parcels.find((parcel) => parcel.current);
    let nextParcels = parcels.filter((parcel) => parcel.id > currentParcel.id);

    // calcula quantidade de parcelas pagas, a partir do valor pago
    const numberOfPaidParcels =
      amount > loan.portion ? Math.trunc(amount / loan.portion) : 1;
    console.log(numberOfPaidParcels);

    // calcula os atributos da parcela atual, após pagamento
    // currentParcel.paidValue = amount;
    // currentParcel.remainderValue = currentParcel.previousValue * 1.1 - amount; // previousValue + 10%
    // currentParcel.status = amount >= loan.portion ? 1 : 2;
    // currentParcel.current = false;
    // await currentParcel.save();

    // for (let i = 0; i < nextParcels.length; i++) {
    //   if (i === 0) {
    //     nextParcels[i].current = true;
    //     nextParcels[i].previousValue = currentParcel.remainderValue;
    //     nextParcels[i].remainderValue =
    //       nextParcels[i].previousValue * 1.1 - loan.portion;
    //   } else {
    //     nextParcels[i].previousValue = nextParcels[i - 1].remainderValue;
    //     nextParcels[i].remainderValue =
    //       nextParcels[i].previousValue * 1.1 - loan.portion;
    //   }

    //   await nextParcels[i].save();
    // }

    return res.json(parcels);
  }
}

export default LoanController;
