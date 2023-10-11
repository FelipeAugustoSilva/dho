import React, { useState } from "react";
import styled from "styled-components";
import Form from "./components/usuarios/Form.js";
import Grid from "./components/usuarios/Grid";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import GlobalStyle from "./styles/global";
import logo from "./styles/imagem/Logomarca Cooperval-02.png"

const Container = styled.div`
  width: 90%;
  max-width: 1500px;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
  height: auto;

  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 820px) {
    overflow: hidden;
    width: 790px;
  }
  @media (max-width: 640px) {
    overflow: hidden;
    width: 600px;
    padding-left: 20px;
  }
  @media (max-width: 500px) {
    overflow: hidden;
    width: 400px;
    padding-left: 20px;
  }
  @media (max-width: 420px) {
    overflow: hidden;
    width: 390px;
    padding-left: 1px;
    margin: auto;
    Grid{
      margin-top: 50%;
    }
  }
`;

const Title = styled.nav`
  height: 4rem;
  width: 1600px;
  background-color: #0D7E48;

  @media (max-width: 1024px) {
    width: 1024px;
  }
  @media (max-width: 640px) {
    width: 680px;
    height: 4rem;
  }
  @media (max-width: 420px) {
    width: 440px;
    height: 4rem;
  }
`;

const Title2 = styled.h2`
  color: #fff;
  font-size: 28px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 26px;

  }
  @media (max-width: 820px) {
    margin-top:1%;
    font-size: 22px;
    justify-content: space-around;
  }
  @media (max-width: 640px) {
    margin-top:2%;
    font-size: 22px;
    padding-left: 17vw;
    justify-content: flex-start;
  }
  @media (max-width: 420px) {
    font-size: 20px;
    margin-top:3%;
    padding-left: 17vw;
    justify-content: flex-start;
  } 
`;

const Image = styled.img`
  width: 180px;
  height: 40px;
  display: block; /* Adicione display: block para garantir que a imagem seja exibida corretamente */
  
  @media (max-width: 500px) {
    display: none; /* Oculta a imagem em telas menores que 500px */
  }
`;


function Usuarios() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  

  const getUsers = async () => {
    try {
      const res = await axios.get("http://avaliacao.cooperval.coop.br:8815/usuarios/");
      setUsers(res.data.sort((a, b) => (a.logon > b.logon ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>
          <Title2>
            <h2>Cadastro Usuarios</h2>
            <Image src={logo} alt="Logo"/>{/**/}
          </Title2>
        </Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Usuarios;
