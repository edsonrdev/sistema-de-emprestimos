import { useEffect, useState } from "react";

import { Container } from "./styles";

import BorrowedIcon from "../../assets/BorrowedIcon.svg";
import ReceivedIcon from "../../assets/ReceivedIcon.svg";
import ToReceiveIcon from "../../assets/ToReceiveIcon.svg";
import CustomerIcon from "../../assets/CustomerIcon.svg";

import { Header } from "../../components/Header";

import { api } from "../../services";
import { convertToRealBR } from "../../helpers/convertToRealBR";

export const Dashboard = () => {
  const [clients, setClients] = useState([]);

  // EMPRESTADO TOTAL = EMPRESTADO INICIAL + TODOS OS EMPRESTADOS ADICIONAIS
  // const borrowedTotal =
  //   clients.reduce((acc, client) => acc + client.totalInitial, 0) +
  //   clients
  //     ?.filter((client) => client.movements?.length !== 0)
  //     ?.map((client) => client?.movements)[0]
  //     ?.filter((mov) => mov?.type === "output")
  //     ?.reduce((acc, movement) => acc + movement.amount, 0);


  const borrowedTotal = clients.reduce(
    (acc, client, index) =>
      acc +
      client.totalInitial +
      clients[index].movements
        ?.filter((m) => m.type === "output")
        .reduce((acc, m) => acc + m.amount, 0),
    0
  );

  const receivedTotal = clients.reduce(
    (acc, client, index) =>
      acc +
      client.paid +
      clients[index].movements
        ?.filter((m) => m.type === "input")
        .reduce((acc, m) => acc + m.amount, 0),
    0
  );

  const toReceive = clients
    .filter((client, index) => client.movements[client.movements.length - 1])
    // .reduce((acc, m) => acc + m.amount, 0);


  console.clear();
  console.log(borrowedTotal);
  console.log(receivedTotal);
  console.log(toReceive);

  const getClients = async () => {
    const res = await api.get("/clients");
    setClients(res.data);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Container>
      <Header active="dashboard" />

      <main>
        <div className="container">
          <h2>Dashboard</h2>

          <div className="summary">
            <div className="card">
              <span className="title">Emprestado (total)</span>
              <img src={BorrowedIcon} alt="Emprestado (total)" />
              <span className="price">{convertToRealBR(borrowedTotal)}</span>
            </div>

            <div className="card">
              <span className="title">Recebido (total)</span>
              <img src={ReceivedIcon} alt="Recebido (total)" />
              {/* <span className="price">{convertToRealBR(receivedTotal)}</span> */}
              <span className="price">{convertToRealBR(receivedTotal)}</span>
            </div>

            <div className="card">
              <span className="title">A receber (com juros)</span>
              <img src={ToReceiveIcon} alt="A receber (total)" />
              {/* <span className="price">{convertToRealBR(remainderTotal)}</span> */}
              <span className="price">{convertToRealBR(toReceive)}</span>
            </div>

            <div className="card">
              <span className="title">Clientes (ativos)</span>
              <img src={CustomerIcon} alt="Clientes (ativos)" />
              <span className="price">{clients.length}</span>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
};
