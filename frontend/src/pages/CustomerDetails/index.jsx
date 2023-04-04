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
import { NewLoanModal } from "../../components/NewLoanModal";

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});

  const totalPaid =
    customer?.paid +
    customer?.movements
      ?.filter((mov) => mov?.type === "input")
      ?.reduce((acc, item) => acc + item?.amount, 0);

  const totalAdditional = customer?.movements
    ?.filter((mov) => mov?.type === "output")
    ?.reduce((acc, item) => acc + item?.amount, 0);

  // console.log(totalAdditional);

  const [openModal, setOpenModal] = useState(false);
  const [openNewLoanModal, setOpenNewLoanModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [modalType, setModalType] = useState("");

  const desiredAmountRef = useRef(null);
  const interestRateRef = useRef(null);
  // const clientIdRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  const getCustomer = async () => {
    const res = await api.get(`/clients/${id}`);
    setCustomer(res.data);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    // console.log(customer);
    getCustomer();
  }, [customer]);

  const handleCloseModal = (modalFeature = "") => {
    setCurrentCustomer({});
    setModalType("");
    
    if (modalFeature === "newLoan") {
      setOpenNewLoanModal(false);
    } else if (modalFeature === "oldLoan") {
      setOpenModal(false);
    }
  };

  const handleOpenModal = (modalType, customer, modalFeature = "") => {
    setCurrentCustomer(customer);
    setModalType(modalType);

    if (modalFeature === "newLoan") {
      setOpenNewLoanModal(true);
    } else if (modalFeature === "oldLoan") {
      setOpenModal(true);
    }
  };

  const handleInputAmount = async () => {
    const data = {
      clientId: customer.id,
      amount: Number(desiredAmountRef.current.value),
      type: "input",
    };

    try {
      await api.post("/movements", data);
      toast.success("Valor abatido com sucesso!");
    } catch (error) {
      toast.error(error.response.data.message);
    }

    desiredAmountRef.current.value = "";
  };

  const handleOutputAmount = async () => {
    const data = {
      clientId: customer.id,
      amount: Number(desiredAmountRef.current.value),
      type: "output",
    };

    try {
      await api.post("/movements", data);
      toast.success("Valor contratado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.message);
    }

    desiredAmountRef.current.value = "";
  };

  const handleUpdateInterestRate = async (e) => {
    e.preventDefault();

    const interestRate = interestRateRef.current.value;

    if (!interestRate) {
      return;
    }

    const data = {
      clientId: +id,
      interestRate: +interestRate,
    };

    try {
      await api.patch("/clients/rate", data);
      toast.success("Taxa alterada com sucesso!");
      interestRateRef.current.value = "";
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

            {customer.totalInitial !== 0 && (
              <h2>
                Valor da parcela:{" "}
                <span>{convertToRealBR(customer?.portion)}</span>
              </h2>
            )}

            <Button
              text="Voltar"
              type="button"
              typeUIButton="default"
              onClick={() => history.push("/clients")}
            />
          </div>

          <hr />

          {customer.totalInitial === 0 && customer?.movements?.length === 0 ? (
            <div className="hire-loan">
              <p>Cliente não possui empréstimos no momento.</p>
              <div className="loan-buttons">
                <Button
                  text="Simular empréstimo"
                  type="button"
                  typeUIButton="default"
                  onClick={() => handleOpenModal("default", customer, "newLoan")}
                />

                <span className="or">OU</span>

                <Button
                  text="Empréstimo antigo"
                  type="button"
                  typeUIButton="default"
                  onClick={() => handleOpenModal("default", customer, "oldLoan")}
                />
              </div>
            </div>
          ) : (
            <div className="data-loan">
              <div className="loan-panel">
                <div className="current-loan-data">
                  <header>Resumo do empréstimo</header>
                  <ul>
                    <li>
                      <span className="data-title">
                        Valor inicial contratado:
                      </span>
                      <span className="data-value">
                        {convertToRealBR(customer?.totalInitial)}
                      </span>
                    </li>
                    <li>
                      <span className="data-title">Valor inicial abatido:</span>
                      <span className="data-value">
                        {convertToRealBR(customer?.paid)}
                      </span>
                    </li>

                    <li>
                      <span className="data-title">
                        Valor adicional contratado:
                      </span>
                      <span className="data-value">
                        {convertToRealBR(totalAdditional)}
                      </span>
                    </li>

                    <li>
                      <span className="data-title">Valor total abatido:</span>
                      <span className="data-value">
                        {convertToRealBR(totalPaid)}
                      </span>
                    </li>

                    <li>
                      <span className="data-title">Valor total restante:</span>
                      <span className="data-value">
                        {convertToRealBR(customer?.total)}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="forms">
                  <form>
                    <input
                      ref={desiredAmountRef}
                      type="number"
                      min={1}
                      step={0.01}
                      placeholder="Digite o valor desejado (R$)"
                    />
                    <div className="buttons">
                      <Button
                        onClick={handleInputAmount}
                        text="Abater valor"
                        type="button"
                        typeUIButton="default"
                      />

                      <Button
                        onClick={handleOutputAmount}
                        text="Pegar adicional"
                        type="button"
                        typeUIButton="default"
                      />
                    </div>
                  </form>

                  <form onSubmit={(e) => handleUpdateInterestRate(e)}>
                    {/* Taxa atual do empréstimo: {customer.interestRate * 100}% */}

                    <input
                      ref={interestRateRef}
                      type="number"
                      min="1"
                      placeholder="Digite o valor da taxa (1% a 100%)"
                    />
                    <Button
                      text="Alterar taxa"
                      type="submit"
                      typeUIButton="default"
                    />
                  </form>
                </div>
              </div>

              <hr />

              {customer?.movements?.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Data</th>
                      <th>Anterior</th>
                      <th>Juro</th>
                      <th>Valor</th>
                      <th>Restante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer?.movements.map((mov) => (
                      <tr key={mov.id}>
                        <td>{mov.id}</td>
                        <td>{convertDate(mov?.createdAt)}</td>

                        <td>{convertToRealBR(mov?.previous)}</td>
                        <td>
                          {convertToRealBR(mov.interest)} (
                          {mov?.interestRatePrevious * 100}%)
                        </td>
                        <td
                          className={mov.type === "input" ? "input" : "output"}
                        >
                          {convertToRealBR(mov.amount)}
                        </td>
                        {/* <td>{convertToRealBR(mov.remainder)}</td> */}
                        <td>
                          {mov.type === "input"
                            ? `${convertToRealBR(
                                mov.previous
                              )} + ${convertToRealBR(
                                mov.interest
                              )} - ${convertToRealBR(
                                mov.amount
                              )} = ${convertToRealBR(mov.remainder)}`
                            : `${convertToRealBR(
                                mov.previous
                              )} + ${convertToRealBR(
                                mov.interest
                              )} + ${convertToRealBR(
                                mov.amount
                              )} = ${convertToRealBR(mov.remainder)}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>

      {openModal && (
        <LoanModal
          modalType="default"
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleCloseModal={handleCloseModal}
          currentCustomer={currentCustomer}
        />
      )}

      {openNewLoanModal && (
        <NewLoanModal
          modalType="default"
          openNewLoanModal={openNewLoanModal}
          setOpenNewLoanModal={setOpenNewLoanModal}
          handleCloseModal={handleCloseModal}
          currentCustomer={currentCustomer}
        />
      )}
    </Container>
  );
};
