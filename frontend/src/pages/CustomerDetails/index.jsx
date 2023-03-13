import { Container } from "./styles";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services";
import { Header } from "../../components/Header";
import { convertToRealBR } from "../../helpers/convertToRealBR";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

export const CustomerDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [customer, setCustomer] = useState({});
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [modalType, setModalType] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getCustomer = async () => {
      const res = await api.get(`/customers/${id}`);
      setCustomer(res.data);
    };

    getCustomer();
  }, [id]);

  // console.log(customer);

  const handleCloseModal = () => {
    setCurrentCustomer({});
    setModalType("");
    setOpenModal(false);
  };

  const handleOpenModal = (modalType, customer) => {
    setCurrentCustomer(customer);
    setModalType(modalType);
    setOpenModal(true);
  };

  return (
    <Container>
      <Header active="customerDetails" />

      <main>
        <div className="container">
          <div className="page-title">
            <h2>Cliente: {customer.name}</h2>

            <Button
              text="Voltar"
              type="button"
              typeUIButton="default"
              onClick={() => history.push("/customers")}
            />
          </div>

          {customer.Loans?.length === 0 ? (
            <div className="hire-loan">
              <p>O cliente ainda não tem empréstimos contraídos.</p>
              <Button
                text="Contrair empréstimo"
                type="button"
                typeUIButton="default"
                onClick={() => handleOpenModal("default", customer)}
              />
            </div>
          ) : (
            <div className="loan-input-values">
              <h3>
                Valor da parcela:{" "}
                <span>{convertToRealBR(customer.Loans?.[0].portion)}</span>
              </h3>

              <div className="discounted-value">
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  placeholder="Valor a ser abatido"
                />
                <Button
                  text="Abater valor"
                  type="button"
                  typeUIButton="default"
                />
              </div>

              <div className="additional-value">
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  placeholder="Contratar valor adicional"
                />
                <Button
                  text="Contratar valor"
                  type="button"
                  typeUIButton="default"
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {openModal && (
        <Modal
          modalType="default"
          entity="loans"
          handleCloseModal={handleCloseModal}
          currentCustomer={currentCustomer}
        />
      )}
    </Container>
  );
};
