import { IoMdClose } from "react-icons/io";
import { api } from "../../services";
import { toast } from "react-toastify";
import { Background, Container } from "./styles";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

/**
 *
 * @param {*}
 * @returns
 *
 * modaType - representa o tipo de UI Modal: default, edit, disable
 * entity - model/tabela no banco de dados ao qual o modal está relacionado: customers, loans, etc.
 * handleCloseModal - handle para fechar o modal e resetar seus valores internos
 * currentCustomer - contém o objeto cliente atual, escolhido para edição/desativação, na listagem
 */
export const LoanModal = ({
  modalType,
  handleCloseModal,
  currentCustomer = {},
}) => {
  const [isOldLoan, setIsOldLoan] = useState(false);

  const schema = yup.object().shape({
    amount: yup.string().required("O VALOR INICIAL é obrigatório!"),
    portion: yup.string().required("O VALOR DA PARCELA é obrigatório!"),

    ...(isOldLoan && {
      paid: yup.string().required("O TOTAL JÁ PAGO é obrigatório!"),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  !isOldLoan && delete errors?.paid?.message;

  const submitCallback = async (data) => {
    let { clientId, amount, portion } = data;
    clientId = Number(clientId);
    amount = Number(amount);
    portion = Number(portion);

    let paid = data.paid === undefined ? null : data.paid;
    paid = !isOldLoan ? 0 : Number(paid);

    const loanData = {
      clientId,
      amount,
      portion,
      paid,
    };

    console.log(loanData);

    try {
      await api.post("/clients/loan", loanData);
      handleCloseModal();
      toast.success("Empréstimo contratado com sucesso!");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Background modalType={modalType}>
      <Container modalType={modalType} onSubmit={handleSubmit(submitCallback)}>
        {/* CREATE NEW LOAN */}
        {modalType === "default" && (
          <>
            <div className="form-header">
              <h2>Novo empréstimo</h2>
              <IoMdClose onClick={handleCloseModal} />
            </div>

            <div className="form-body">
              <input
                type="hidden"
                value={currentCustomer.id}
                {...register("clientId")}
              />
              <div className="form-group">
                <label htmlFor="amount">Valor do empréstimo (R$):</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  id="amount"
                  placeholder="2.000,00"
                  {...register("amount")}
                />
                <span className="error">{errors.amount?.message}</span>
              </div>

              <div className="form-group">
                <label htmlFor="portion">Valor da parcela (R$):</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  id="portion"
                  placeholder="400,00"
                  {...register("portion")}
                />
                <span className="error">{errors.portion?.message}</span>
              </div>

              <div className="form-group">
                <label
                  htmlFor="alreadyExistsLoan"
                  className="alreadyExistsLoan"
                >
                  <input
                    type="checkbox"
                    id="alreadyExistsLoan"
                    value={isOldLoan}
                    onChange={(e) => setIsOldLoan(e.target.checked)}
                  />{" "}
                  É um empréstimo antigo?
                </label>
              </div>

              {isOldLoan && (
                <div className="form-group">
                  <label htmlFor="portion">Total já pago (R$):</label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    id="portion"
                    placeholder="1.200,00"
                    {...register("paid")}
                  />
                  <span className="error">{errors.paid?.message}</span>
                </div>
              )}
            </div>

            <div className="form-footer">
              <button
                className="cancel"
                type="button"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button className="confirm" type="submit">
                Contratar
              </button>
            </div>
          </>
        )}
      </Container>
    </Background>
  );
};
