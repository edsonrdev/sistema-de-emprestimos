import { Container } from "./styles";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services";
import { Header } from "../../components/Header";
import { convertToRealBR } from "../../helpers/convertToRealBR";
import { Button } from "../../components/Button";
import { LoanModal } from "../../components/LoanModal";
import { toast } from "react-toastify";

export const CustomerDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [customer, setCustomer] = useState({});
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [modalType, setModalType] = useState("");
  const [desiredAmount, setDesiredAmount] = useState("");
  const { id } = useParams();
  const history = useHistory();

  // console.log(desiredAmount);
  const getCustomer = async () => {
    const res = await api.get(`/clients/${id}`);
    setCustomer(res.data);
  };

  useEffect(() => {
    getCustomer();
  }, [id]);

  useEffect(() => {
    getCustomer();
  }, [customer]);

  // useEffect(() => {
  // getCustomer();
  // }, [customer]);

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

  const handleInputAmount = async () => {
    const data = {
      loanId: customer.id,
      amount: Number(desiredAmount),
      type: "input",
    };

    // console.log(data);

    try {
      await api.post("/movements", data);
      toast.success("Valor abatido com sucesso!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleOutputAmount = async () => {
    const data = {
      loanId: customer.id,
      amount: Number(desiredAmount),
      type: "output",
    };

    // console.log(data);

    try {
      await api.post("/movements", data);
      toast.success("Valor contratado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
              onClick={() => history.push("/clients")}
            />
          </div>

          {!customer.loans?.length ? (
            <div className="hire-loan">
              <p>O cliente ainda não tem empréstimos contratados.</p>
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
                  value={desiredAmount}
                  onChange={(e) => setDesiredAmount(e.target.value)}
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
