import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { api } from "../../services";

import { Container } from "./styles";

import EditIcon from "../../assets/EditIcon.svg";
import InactivateIcon from "../../assets/InactivateIcon.svg";

import { Header } from "../../components/Header";
import { ClientModal } from "../../components/ClientModal";
import { FullModal } from "../../components/FullModal";
import { Button } from "../../components/Button";

export const Customers = () => {
  const [modalType, setModalType] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState({});

  const [disabled, setDisabled] = useState(true);
  const [search, setSearch] = useState("");

  // const disabledCustomers = customers.filter(customer => customer.isDisabled === true);

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
  }, [currentCustomer, disabled, search]);

  const handleOpenModal = (modalType, customer) => {
    setCurrentCustomer(customer);
    setModalType(modalType);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentCustomer({});
    setModalType("");
    setOpenModal(false);
  };

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
              onClick={() => handleOpenModal("default")}
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
              {customers.map((customer) => (
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
                        onClick={() => handleOpenModal("edit", customer)}
                      />
                    ) : (
                      ""
                    )}

                    <img
                      src={InactivateIcon}
                      alt="Desativar cliente"
                      onClick={() => handleOpenModal("disable", customer)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {openModal && (
        <FullModal
          modalType={modalType}
          handleCloseModal={handleCloseModal}
          currentCustomer={currentCustomer}
        />
      )}
    </Container>
  );
};
