# Sistema de Empréstimos

Sistema de Controle de Empréstimos, útil para **agiotas** em geral, pois facilita a **organização** e assegura um melhor **gerenciamento do negócio**.

## Pré-requisitos 🚨

Antes de instalar e utilizar o nosso sistema, é necessário:

1.  Ter os softwares abaixo instalados na sua máquina:
    - [NodeJS](https://nodejs.org/en)
    - [MySQL](https://dev.mysql.com/downloads/installer/)
2.  Criar um Banco de Dados MySQL, chamado **"controledeemprestimos"** (sem as aspas).

## Instalação ⚙️

Com os pré-requisitos atendidos, vamos para a instalação.

1. Baixe o nosso repositório (executando o código abaixo no seu terminal):
   `git clone https://github.com/edsonrdev/sistema-de-emprestimos.git`

2. Após baixar o repositório, entre no diretório recém-criado:
   `cd sistema-de-emprestimos`

3. Neste ponto, você terá dois subdiretórios dentro **sistema-de-emprestimos**: **backend** e **frontend**. Abra um terminal dentro de cada uma deles e execute o código abaixo (que instala as dependências do projeto):
   `npm install`

4. Após baixar todas as dependências em cada diretório, volte na pasta do backend, no arquivo `src/database/connection.js` e altere a senha de `"12345"` para a senha do usuário root do seu banco de dados.

5. Feito isso, é só rodar o comando abaixo em ambos os diretórios (backend e frontend), para inicializar a aplicação:
   `npm start`

6. Após alguns segundos, seu navegador irá abrir uma guia, rodando o projeto React, no endereço [http://localhost:3000](http://localhost:3000).

## Tecnologias 🛠️
