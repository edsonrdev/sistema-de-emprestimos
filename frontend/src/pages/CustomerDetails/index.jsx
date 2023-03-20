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
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [modalType, setModalType] = useState("");

  const desiredAmountRef = useRef(null);

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

          {customer.initial === 0 && customer?.movements?.length === 0 ? (
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
              </div>

              <div className="data-loan">
                {customer?.movements?.length > 0 && (
                  <table>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Anterior</th>
                        <th>Juros (10%)</th>
                        <th>Valor</th>
                        <th>Restante</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer?.movements.map((mov) => (
                        <tr key={mov.id}>
                          <td>{convertDate(mov?.createdAt)}</td>

                          <td>{convertToRealBR(mov?.previous)}</td>
                          <td>{convertToRealBR(mov.interest)}</td>
                          <td
                            className={
                              mov.type === "input" ? "input" : "output"
                            }
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

                <aside>
                  <div className="current-loan-data">
                    <header>Resumo do empréstimo</header>
                    <ul>
                      <li>
                        <span className="data-title">Contratado inicial:</span>
                        <span className="data-value">
                          {convertToRealBR(customer?.initial)}
                        </span>
                      </li>
                      <li>
                        <span className="data-title">Abatido inicial:</span>
                        <span className="data-value">
                          {convertToRealBR(customer?.paid)}
                        </span>
                      </li>
                      <li>
                        <span className="data-title">Total abatido:</span>
                        <span className="data-value">
                          {/* {convertToRealBR(customer?.paid)} */}
                          {convertToRealBR(totalPaid)}
                        </span>
                      </li>
                      <li>
                        <span className="data-title">
                          Total pego adicional:
                        </span>
                        <span className="data-value">
                          {convertToRealBR(totalAdditional)}
                        </span>
                      </li>

                      <li>
                        <span className="data-title">Total restante:</span>
                        <span className="data-value">
                          {convertToRealBR(customer?.total)}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <form className="form-change-total">
                    <input
                      ref={desiredAmountRef}
                      type="number"
                      min={1}
                      step={0.01}
                      placeholder="Digite o valor desejado"
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
