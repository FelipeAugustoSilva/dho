import React, { useState } from 'react';
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./Logomarca Cooperval-05.png"





const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinhe os itens à esquerda */
  text-align: start;
  gap: 10px;
  padding: 0 10px;
  height: auto;



  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 640px) {
    width: 540px;
  }
  @media (max-width: 500px) {
    width: 400px;
  }
`;



const Title2 = styled.h2`
  padding-left: 8.5vw;
  padding-top: 2vw;




  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
    padding-left: 25%;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    display: flex;
    padding-left: 10%;
  }
  @media (max-width: 500px) {
    font-size: 18px;
    display: flex;
    padding-left: 20%;

  }
  @media (max-width: 420px) {
    font-size: 20px;
    display: flex;
    padding-left: 20%;

  }

`;

const Input = styled.input`
  width: 400px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;

  @media (max-width: 640px) {
    width: 500px;
    height: 30px;
  }
  @media (max-width: 420px) {
    width: 300px;
    height: 35px;
  }
`;





const Label = styled.label`
  padding-top: 25px;
  font-weight: bold;
  font-size: 17px;
  text-align: left
  
  @media (max-width: 500px) {
  font-size: 16px;
  }
`;


const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  background-color:  #808080;
  color: white;
  width: 100px;
  height: 40px;
  font-weight: bold;
  margin: 8px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #0D7E48;
  }
  @media (max-width: 640px) {
    width: 100px;
  }
  @media (max-width: 420px) {
    width: 120px;
  }
`;
const FormContainer = styled.form`
  width: 100%;
  max-width: 440px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: space-between; 

  display: flex; 
  padding: 5px 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 1px;
  align-items: flex-end;
  gap: 5px;
  margin: 10px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    width: 500px;
    padding: 20px;
    display: flex;
    justify-content: space-between; 
  }
  @media (max-width: 640px) {
    width: 500px;
    padding: 20px;
    display: flex;
    justify-content: space-between; 
  }
  @media (max-width: 500px) {
    width: 440px;
    padding: 20px;
    display: flex;
    justify-content: space-between; 
  }
  @media (max-width: 420px) {
    width: 340px;
    padding: 15px;
    margin: 2px 0px 0px 0px;
  }
`;





function Login() {
  const [logon, setLogon] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async () => {
    try {
      const logonUpperCase = logon.toUpperCase(); // Converter para maiúsculas
  
      const response = await fetch('http://avaliacao.cooperval.coop.br:8815/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logon: logonUpperCase, // Usar o valor em maiúsculas
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.mensagem);
  
        // Redefinir o formulário
        const form = document.querySelector('form');
        if (form) {
          form.reset();
        }
  
        const loginEncoded = encodeURIComponent(btoa(logonUpperCase)); // Usar o valor em maiúsculas
        console.log(loginEncoded);
  
        setTimeout(function () {
          window.location.href = `http://avaliacao.cooperval.coop.br/?login=${loginEncoded}`;
        }, 2000);
  
      } else {
        toast.error(data.error || 'Erro desconhecido no login.');
      }
  
    } catch (error) {
      alert('Erro de rede ou erro desconhecido.');
    }
  };
  


  return (
    <FormContainer>
      <Title2>
        <img src={logo} style={{ width: '200px', height: 'auto' }} alt="Logo"/>{/**/}

      </Title2>
      <Container>
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="Digite aqui..."
          value={logon}
          onChange={(e) => setLogon(e.target.value)}
        />
        <Label>Senha</Label>
        <Input
          type="password"
          placeholder="Digite aqui..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="button" onClick={handleLogin}>
          Entrar!
        </Button>
      </Container>
    </FormContainer>
  );
}

export default Login;
