import { Container } from "./styles";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services";
import { Header } from "../../components/Header";
import { convertToRealBR } from "../../helpers/convertToRealBR";
import { Button } from "../../components/Button";
import { LoanModal } from "../../components/LoanModal";

export const CustomerDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [customer, setCustomer] = useState({});
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [modalType, setModalType] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getCustomer = async () => {
      const res = await api.get(`/clients/${id}`);
      setCustomer(res.data);
    };

    getCustomer();
  }, [id]);

  // console.log(customer.loans);

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

  const handleInputAmount = () => {};

  const handleOutputAmount = () => {};

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
              onClick={() => history.push("/clients")}
            />
          </div>

          {!customer.loans?.length ? (
            <div className="hire-loan">
              <p>O cliente ainda não tem empréstimos contraídos.</p>
              <Button
                text="Contratar empréstimo"
                type="button"
                typeUIButton="default"
                onClick={() => handleOpenModal("default", customer)}
              />
            </div>
          ) : (
            <div className="loan-input-values">
              <h3>
                Valor da parcela:{" "}
                <span>{convertToRealBR(customer.loans?.[0].portion)}</span>
              </h3>

              <form className="form-change-total">
                <Button
                  onClick={handleInputAmount}
                  text="Abater valor"
                  type="button"
                  typeUIButton="default"
                />
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  placeholder="Valor desejado"
                />
                <Button
                  onClick={handleOutputAmount}
                  text="Contratar valor"
                  type="button"
                  typeUIButton="default"
                />
              </form>
            </div>
          )}
        </div>
      </main>

      {openModal && (
        <LoanModal
          modalType="default"
          handleCloseModal={handleCloseModal}
          currentCustomer={currentCustomer}
        />
      )}
    </Container>
  );
};
