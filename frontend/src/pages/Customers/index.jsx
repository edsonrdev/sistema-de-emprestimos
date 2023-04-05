import { useState, useEffect, useContext } from "react";
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
  const { visibility, showModal } = useContext(ModalContext);
  
  const [customers, setCustomers] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [search, setSearch] = useState("");

  const getCustomers = async () => {
    const res = disabled
      ? await api.get("/clients/actives")
      : await api.get("/clients/inactives");

    let customers = res.data;

    if (search) {
      customers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setCustomers(customers);
  };

  useEffect(() => {
    getCustomers();
  }, [disabled, search]);

  useEffect(() => {
    getCustomers();
  }, []);

  // console.log(customers);

  useEffect(() => {
    setSearch("");
  }, [disabled]);

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
                value={disabled}
                onChange={() => setDisabled(!disabled)}
              />
              Mostrar clientes desativados
            </label>
          </div>

          <div className="search-new-customers">
            <div className="search-customers">
              <input
                type="search"
                placeholder="Pesquisar cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button
                text="Limpar"
                type="button"
                typeUIButton="default"
                onClick={() => setSearch("")}
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
              {[...customers].reverse().map((customer) => (
                <tr key={customer.id}>
                  <td>
                    {customer.active ? (
                      <Link
                        to={customer.active ? `/clients/${customer.id}` : ""}
                      >
                        {customer.name}
                      </Link>
                    ) : (
                      <>{customer.name}</>
                    )}
                  </td>
                  <td>{customer.phone ? customer.phone : "..."}</td>
                  <td>{customer.address}</td>
                  <td className="options">
                    {customer.active ? (
                      <img
                        src={EditIcon}
                        alt="Editar cliente"
                        onClick={() => showModal(customer, "edit")}
                      />
                    ) : (
                      ""
                    )}

                    <img
                      src={InactivateIcon}
                      alt="Desativar cliente"
                      onClick={() => showModal(customer, "disable")}
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
