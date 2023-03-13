import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
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

  const borrowedTotal = clients
    .filter((client) => client.loans.length)
    .map((client) => client.loans)
    .map((loan) => loan[0].total)
    .reduce((acc, loan) => acc + loan, 0);

  const receivedTotal = clients
    .filter((client) => client.loans.length)
    .map((client) => client.loans)
    .map((loan) => loan[0].paid)
    .reduce((acc, loan) => acc + loan, 0);

  // console.log(receivedTotal);

  const remainderTotal = clients
    .filter((client) => client.loans.length)
    .map((client) => client.loans)
    .map((loan) => loan[0].remainder)
    .reduce((acc, loan) => acc + loan, 0);

  const inactiveClients = clients.filter(
    (client) => client.active === false
  ).length;

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
              <span className="price">{convertToRealBR(receivedTotal)}</span>
            </div>
            <div className="card">
              <span className="title">A receber (total)</span>
              <img src={ToReceiveIcon} alt="A receber (total)" />
              <span className="price">{convertToRealBR(remainderTotal)}</span>
            </div>
            <div className="card">
              <span className="title">Clientes (total)</span>
              <img src={CustomerIcon} alt="Clientes (ativos)" />
              <span className="price">{clients.length}</span>
            </div>

            <div className="card">
              <span className="title">Emprestado (mês)</span>
              <img src={BorrowedIcon} alt="Emprestado (mês)" />
              <span className="price">0</span>
            </div>
            <div className="card">
              <span className="title">Recebido (mês)</span>
              <img src={ReceivedIcon} alt="Recebido (mês)" />
              <span className="price">0</span>
            </div>
            <div className="card">
              <span className="title">A receber (mês)</span>
              <img src={ToReceiveIcon} alt="A receber (mês)" />
              <span className="price">0</span>
            </div>
            <div className="card">
              <span className="title">Clientes (inativos)</span>
              <img src={CustomerIcon} alt="Clientes (inativos)" />
              <span className="price">{inactiveClients}</span>
            </div>
          </div>

          <h2>Emprestado x Recebido x A receber (ano atual)</h2>
        </div>
      </main>
    </Container>
  );
};