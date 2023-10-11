import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Form from "./components/login/Form.js";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import GlobalStyle from "./styles/global";




const Container = styled.div`
  width: 100%;
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
  @media (max-width: 640px) {
    width: 450px;
  }
  @media (max-width: 500px) {
    width: 400px;
    padding-left: 20px;
  }
  @media (max-width: 420px) {
    width: 320px;
    padding-left: 1px;
    margin: auto;
    Form{
      margin-top: 50%;
    }
    
  }
`;

const Title = styled.nav`
  height: 4rem;
  width: 1600px;
  background-color: #0D7E48;

  @media (max-width: 1024px) {
    height: 3.3rem;
    width: 1024px;
  }

  @media (max-width: 640px) {
    height: 3rem;
    width: 680px;
  }
  @media (max-width: 500px) {
    height: 2.5rem;
    width: 540px;
  }
  @media (max-width: 420px) {
    height: 2.5rem;
    width: 450px;
  }
`;

const Title2 = styled.h2`
  color: #fff;
  font-size: 28px;
  padding-left: 15vw;

  @media (max-width: 1024px) {
    font-size: 25px;
    display: flex;
    justify-content: flex-start;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    display: flex;
    padding-left: 10%;

  }
  @media (max-width: 500px) {
    font-size: 18px;
    display: flex;
    padding-left: 10%;

  }
  @media (max-width: 420px) {
    font-size: 20px;
    display: flex;
    padding-left: 12%;

  }

`;




function Login() {
  const [setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);



  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://avaliacao.cooperval.coop.br:8815/login/");
      setUsers(res.data.sort((a, b) => (a.logon > b.logon ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Container>
        <Title>
          <Title2>
            <h2>Avaliação DHO</h2>
          </Title2>
        </Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Login;
