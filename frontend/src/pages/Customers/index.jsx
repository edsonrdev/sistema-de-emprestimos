import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";
import EditIcon from "../../assets/EditIcon.svg";
import InactivateIcon from "../../assets/InactivateIcon.svg";

import { api } from "../../services";
import {ModalContext} from "../../providers/Modal"
import { Header } from "../../components/Header";
import { ClientModal } from "../../components/ClientModal";
import { Button } from "../../components/Button";

export const Customers = () => {
  // application contexts
  const { visibility, showModal } = useContext(ModalContext);

  // local states
  const [clients, setClients] = useState([]);
  const [searchClient, setSearchClient] = useState("");

  // derived states
  // const disabledClients = clients.filter(client => !client.active);
  // const researchedClients = searchClient ? clients.filter(client => client.name.toLowerCase().includes(searchClient.toLowerCase())) : [];

  const getClients = () => {
    api.get("/clients")
    .then(resp => {
      const { data } = resp;
      setClients(data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getClients();
  });
  console.log(clients);

  useEffect(() => {
    getClients();
  }, []);


  return (
    <Container>
      <Header active="customers" />

      <main>
        <div className="container">
          <div className="page-title">
            <h2>Clientes</h2>

            <label htmlFor="show-disabled" className="show-disabled">
              <input
                type="checkbox"
                id="show-disabled"
              />
              Mostrar clientes desativados
            </label>
          </div>

          <div className="search-new-customers">
            <div className="search-customers">
              <input
                type="search"
                placeholder="Pesquisar cliente..."
                value={searchClient}
                onChange={(e) => setSearchClient(e)}
              />
            </div>

            <Button
              text="Novo cliente"
              type="button"
              typeUIButton="default"
              onClick={showModal}
            />
          </div>

          <table className="customers-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Opções</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    {client.active ? (
                      <Link
                        to={client.active ? `/clients/${client.id}` : ""}
                      >
                        {client.name}
                      </Link>
                    ) : (
                      <>{client.name}</>
                    )}
                  </td>
                  <td>{client.phone ? client.phone : "..."}</td>
                  <td>{client.address}</td>
                  <td className="options">
                    {client.active ? (
                      <img
                        src={EditIcon}
                        alt="Editar cliente"
                        onClick={() => showModal(client, "edit")}
                      />
                    ) : (
                      ""
                    )}

                    <img
                      src={InactivateIcon}
                      alt="Desativar cliente"
                      onClick={() => showModal(client, "disable")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {visibility && <ClientModal />}
    </Container>
  );
};
