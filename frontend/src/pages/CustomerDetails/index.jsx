import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../../services";
import { convertToRealBR } from "../../helpers/convertToRealBR";
import { convertDate } from "../../helpers/convertDate";

import { Container } from "./styles";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { LoanModal } from "../../components/LoanModal";

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});
  // const movements = customer?.movements;
  // const myRef = useRef([]);

  const [openModal, setOpenModal] = useState(false);
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
  }, []);

  console.log(customer.total > 0);

  // console.log(movements);
  // console.log(customer);

  // useEffect(() => {
  // console.log(customer);
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

          {customer.total === 0 && customer?.movements?.length === 0 ? (
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
            <>
              <div className="loan-input-values">
                <h3>
                  Valor da parcela:{" "}
                  <span>{convertToRealBR(customer?.portion)}</span>
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
                    placeholder="Digite o valor desejado"
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

              <div className="data-loan">
                {customer?.movements?.length > 0 && (
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Valor (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer?.movements.map((mov) => (
                        <tr key={mov.id}>
                          <td>{mov.id}</td>
                          <td>{mov.createdAt}</td>
                          <td
                            className={
                              mov.type === "input" ? "input" : "output"
                            }
                          >
                            {mov.type === "input" ? "Entrada" : "Saída"}
                          </td>
                          <td>{convertToRealBR(mov.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <aside>
                  <div className="current-loan-data">
                    <header>Empréstimo atual</header>
                    <ul>
                      <li>
                        <span className="data-title">Data de contratação:</span>
                        <span className="data-value">
                          {customer?.createdAt}
                        </span>
                      </li>
                      <li>
                        <span className="data-title">Valor contratado:</span>
                        <span className="data-value">
                          {convertToRealBR(customer?.total)}
                        </span>
                      </li>
                      <li>
                        <span className="data-title">Valor pago:</span>
                        <span className="data-value">
                          {convertToRealBR(customer?.paid)}
                        </span>
                      </li>
                      <li>
                        <span className="data-title">Valor restante:</span>
                        <span className="data-value">
                          {convertToRealBR(customer?.remainder)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </>
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
