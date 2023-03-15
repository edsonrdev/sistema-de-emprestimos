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
export const FullModal = ({
  modalType,
  handleCloseModal,
  currentCustomer = {},
}) => {
  const schema = yup.object().shape({
    ...((modalType === "default" || modalType === "edit") && {
      name: yup
        .string()
        .required("NOME é obrigatório!")
        .min(3, "Necessário pelo menos 3 caracteres!"),
      phone: yup.string().max(11, "É necessário 11 caracteres!"),
      address: yup.string().required("ENDEREÇO é obrigatório!"),
    }),

    // ...(entity === "loans" && {
    //   total: yup.string().required("O valor TOTAL é obrigatório!"),
    //   portion: yup.string().required("O valor da PARCELA é obrigatório!"),

    //   ...(isAlreadyLoan === true && {
    //     paid: yup.string().required("O total JÁ PAGO é obrigatório!"),
    //   }),
    // }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitCallback = async (data) => {
    if (modalType === "default") {
      try {
        await api.post("/clients", data);
        handleCloseModal();
        toast.success("Cliente salvo com sucesso!");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }

    if (modalType === "edit") {
      try {
        await api.put(`/clients/${currentCustomer.id}`, data);
        handleCloseModal();
        toast.success("Cliente editado com sucesso!");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleDisableCustomer = async (currentCustomer) => {
    try {
      await api.patch(`/clients/inactivate/${currentCustomer.id}`);
      handleCloseModal();
      toast.success(
        `${
          currentCustomer.active
            ? "Cliente desativado com sucesso!"
            : "Cliente ativado com sucesso!"
        }`
      );
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Background modalType={modalType}>
      <Container modalType={modalType} onSubmit={handleSubmit(submitCallback)}>
        {/* CREATE NEW CLIENT */}
        {modalType === "default" && (
          <>
            <div className="form-header">
              <h2>Novo cliente</h2>
              <IoMdClose onClick={handleCloseModal} />
            </div>

            <div className="form-body">
              <div className="form-group">
                <label htmlFor="name">Nome ou apelido:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Francisco Gomes (Seu Chico)"
                  {...register("name")}
                />
                <span className="error">{errors.name?.message}</span>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefone (11 números):</label>
                <input
                  type="number"
                  min="1"
                  id="phone"
                  placeholder="87999999999"
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
                Salvar
              </button>
            </div>
          </>
        )}

        {/* EDIT CLIENT */}
        {modalType === "edit" && (
          <>
            <div className="form-header">
              <h2>Editar cliente</h2>
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
                <label htmlFor="phone">Telefone (11 números):</label>
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
                  defaultValue={currentCustomer ? currentCustomer.address : ""}
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
                Salvar
              </button>
            </div>
          </>
        )}

        {/* ATIVAR & DESATIVAR CLIENTE */}
        {modalType === "disable" && (
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
                  <strong>Telefone:</strong>
                  <span>
                    {currentCustomer.phone ? currentCustomer.phone : "..."}
                  </span>
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
      </Container>
    </Background>
  );
};
