import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

import { api } from "../../services";

import { Background, Container } from "./styles";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalContext } from "../../providers/Modal";

export const ClientModal = () => {
  // modal context
  const {theme, client, hiddeModal} = useContext(ModalContext);

  const schema = yup.object().shape({
    ...((theme === "default" || theme === "edit") && {
      name: yup
        .string()
        .required("NOME é obrigatório!")
        .min(3, "Necessário pelo menos 3 caracteres!"),
      phone: yup.string().max(11, "É necessário 11 caracteres!"),
      address: yup.string().required("ENDEREÇO é obrigatório!"),
    }),
  });

  const {register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema) });

  const submitCallback = async (data) => {
    if (theme === "default") {
      try {
        await api.post("/clients", data);
        toast.success("Cliente salvo com sucesso!");
      } catch (err) {
        toast.error(err.response.data.message);
      }

      hiddeModal();
    }

    if (theme === "edit") {
      try {
        await api.put(`/clients/${client.id}`, data);
        toast.success("Cliente editado com sucesso!");
      } catch (err) {
        toast.error(err.response.data.message);
      }

      hiddeModal();
    }
  };

  const handleDisableClient = async (client) => {
    try {
      await api.patch(`/clients/inactivate/${client.id}`);
      toast.success(
        `${
          client.active
            ? "Cliente desativado com sucesso!"
            : "Cliente ativado com sucesso!"
        }`
      );
    } catch (err) {
      toast.error(err.response.data.message);
    }

    hiddeModal();
  };

  return (
    <Background>
      <Container theme={theme} onSubmit={handleSubmit(submitCallback)}>
        {/* CREATE NEW CLIENT */}
        {theme === "default" && (
          <>
            <div className="form-header">
              <h2>Novo cliente</h2>
              <IoMdClose onClick={hiddeModal} />
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
                onClick={hiddeModal}
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
        {theme === "edit" && (
          <>
            <div className="form-header">
              <h2>Editar cliente</h2>
              <IoMdClose onClick={hiddeModal} />
            </div>

            <div className="form-body">
              <div className="form-group">
                <label htmlFor="name">Nome ou apelido:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Francisco Gomes (Seu Chico)"
                  defaultValue={client ? client.name : ""}
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
                  defaultValue={client ? client.phone : ""}
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
                  defaultValue={client ? client.address : ""}
                  {...register("address")}
                />
                <span className="error">{errors.address?.message}</span>
              </div>
            </div>

            <div className="form-footer">
              <button
                className="cancel"
                type="button"
                onClick={hiddeModal}
              >
                Cancelar
              </button>
              <button className="confirm" type="submit">
                Salvar
              </button>
            </div>
          </>
        )}

        {/* ABLE/DISABLE CLIENT */}
        {theme === "disable" && (
          <>
            <div className="form-header">
              <h2>{client.active ? "Desativar" : "Ativar"} cliente</h2>
              <IoMdClose onClick={hiddeModal} />
            </div>

            <div className="form-body">
              <div className="form-group form-group-inline">
                <div>
                  <strong>Cliente:</strong>
                  <span>{client.name}</span>
                </div>

                <div>
                  <strong>Telefone:</strong>
                  <span>
                    {client.phone ? client.phone : "..."}
                  </span>
                </div>
                <div>
                  <strong>Endereço:</strong>
                  <span>{client.address}</span>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button
                className="cancel"
                type="button"
                onClick={hiddeModal}
              >
                Cancelar
              </button>
              <button
                className="confirm"
                type="button"
                onClick={() => handleDisableClient(client)}
              >
                {client.active ? "Desativar" : "Ativar"}
              </button>
            </div>
          </>
        )}
      </Container>
    </Background>
  );
};
