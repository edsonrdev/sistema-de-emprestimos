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
export const Modal = ({
  modalType,
  entity,
  handleCloseModal,
  currentCustomer = {},
}) => {
  const [isAlreadyLoan, setIsAlreadyLoan] = useState(false);

  const schema = yup.object().shape({
    ...((modalType === "default" || modalType === "edit") &&
      entity === "customers" && {
        name: yup
          .string()
          .required("NOME é obrigatório!")
          .min(3, "Necessário pelo menos 3 caracteres!"),
        phone: yup
          .string()
          .min(11, "É necessário 11 caracteres!")
          .max(11, "É necessário 11 caracteres!"),
        address: yup.string().required("ENDEREÇO é obrigatório!"),
      }),

    ...(modalType === "default" &&
      entity === "customers" && {
        cpf: yup
          .string()
          .required("CPF é obrigatório!")
          .min(11, "É necessário 11 caracteres!")
          .max(11, "É necessário 11 caracteres!"),
      }),

    ...(entity === "loans" && {
      total: yup.string().required("O valor TOTAL é obrigatório!"),
      portion: yup.string().required("O valor da PARCELA é obrigatório!"),

      ...(isAlreadyLoan === true && {
        paid: yup.string().required("O total JÁ PAGO é obrigatório!"),
      }),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleDisableCustomer = async (currentCustomer) => {
    try {
      await api.patch(`/customers/disabled/${currentCustomer.id}`);
      toast.success(
        `${
          currentCustomer.active
            ? "Cliente desativado com sucesso!"
            : "Cliente ativado com sucesso!"
        }`
      );
      handleCloseModal();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const submitCallback = async (data) => {
    if (modalType === "default") {
      if (entity === "customers") {
        try {
          await api.post("/customers", data);
          toast.success("Cliente salvo com sucesso!");
          handleCloseModal();
        } catch (err) {
          toast.error(err.response.data.message);
        }
      }

      if (entity === "loans") {
        let newPaid = data.paid === undefined ? null : data.paid;
        newPaid = !isAlreadyLoan ? "0" : newPaid;

        const loanData = {
          ...data,
          paid: newPaid,
          customerId: currentCustomer.id,
        };

        console.log(loanData);

        // requisição para cadastrar empréstimo, aqui
        // try {
        //   await api.post("/loans", loanData);
        //   toast.success("Empréstimo contratado com sucesso!");
        //   handleCloseModal();
        // } catch (err) {
        //   toast.error(err.response.data.message);
        // }
      }
    }

    if (modalType === "edit") {
      if (entity === "customers") {
        try {
          await api.patch(`/customers/${currentCustomer.id}`, data);
          toast.success("Cliente editado com sucesso!");
          handleCloseModal();
        } catch (err) {
          toast.error(err.response.data.message);
        }
      }

      // if (entity === "loans") {
      // requisição para empréstimos aqui
      // }
    }
  };

  return (
    <Background modalType={modalType}>
      <Container modalType={modalType} onSubmit={handleSubmit(submitCallback)}>
        {/* CRIAR E EDITAR CLIENTES */}
        {(modalType === "default" || modalType === "edit") &&
          entity === "customers" && (
            <>
              <div className="form-header">
                <h2>
                  {modalType === "default" ? "Novo cliente" : "Editar cliente"}
                </h2>
                <IoMdClose onClick={handleCloseModal} />
              </div>

              <div className="form-body">
                <div className="form-group">
                  <label htmlFor="name">Nome ou apelido:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Francisco Gomes (Seu Chico)"
                    defaultValue={currentCustomer ? currentCustomer.name : ""}
                    {...register("name")}
                  />
                  <span className="error">{errors.name?.message}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="cpf">CPF (apenas números):</label>

                  {modalType === "default" && (
                    <>
                      <input
                        type="number"
                        min="1"
                        id="cpf"
                        placeholder="11122233344"
                        {...register("cpf")}
                      />
                    </>
                  )}

                  {modalType === "edit" && (
                    <>
                      <input
                        type="number"
                        value={currentCustomer.cpf}
                        disabled={currentCustomer.cpf ? true : false}
                      />
                    </>
                  )}

                  <span className="error">{errors.cpf?.message}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefone com DDD (11 números):</label>
                  <input
                    type="number"
                    min="1"
                    id="phone"
                    placeholder="87999999999"
                    defaultValue={currentCustomer ? currentCustomer.phone : ""}
                    {...register("phone")}
                  />
                  <span className="error">{errors.phone?.message}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Endereço:</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Fazenda Aticum"
                    defaultValue={
                      currentCustomer ? currentCustomer.address : ""
                    }
                    {...register("address")}
                  />
                  <span className="error">{errors.address?.message}</span>
                </div>
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
                  {modalType === "default" ? "Salvar" : "Editar"}
                </button>
              </div>
            </>
          )}

        {/* ATIVAR & DESATIVAR CLIENTE */}
        {modalType === "disable" && entity === "customers" && (
          <>
            <div className="form-header">
              <h2>{currentCustomer.active ? "Desativar" : "Ativar"} cliente</h2>
              <IoMdClose onClick={handleCloseModal} />
            </div>

            <div className="form-body">
              <div className="form-group form-group-inline">
                <div>
                  <strong>Cliente:</strong>
                  <span>{currentCustomer.name}</span>
                </div>
                <div>
                  <strong>CPF:</strong>
                  <span>{currentCustomer.cpf}</span>
                </div>
                <div>
                  <strong>Endereço:</strong>
                  <span>{currentCustomer.address}</span>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button
                className="cancel"
                type="button"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className="confirm"
                type="button"
                onClick={() => handleDisableCustomer(currentCustomer)}
              >
                {currentCustomer.active ? "Desativar" : "Ativar"}
              </button>
            </div>
          </>
        )}

        {/* NOVO EMPRÉSTIMO */}
        {modalType === "default" && entity === "loans" && (
          <>
            <div className="form-header">
              <h2>Novo empréstimo</h2>
              <IoMdClose onClick={handleCloseModal} />
            </div>

            <div className="form-body">
              <div className="form-group">
                <label htmlFor="total">Valor total do empréstimo (R$):</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  id="total"
                  placeholder="2.000,00"
                  {...register("total")}
                />
                <span className="error">{errors.total?.message}</span>
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
                    value={isAlreadyLoan}
                    onChange={(e) => setIsAlreadyLoan(e.target.checked)}
                  />{" "}
                  É um empréstimo já existente?
                </label>
              </div>

              {isAlreadyLoan && (
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
                  {isAlreadyLoan && (
                    <span className="error">{errors.paid?.message}</span>
                  )}
                  {/* {isAlreadyLoan && delete errors.paid?.message} */}
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
              <button
                className="confirm"
                type="submit"
                // onClick={() => console.log("emprestimo contraido")}
              >
                Contrair
              </button>
            </div>
          </>
        )}
      </Container>
    </Background>
  );
};
