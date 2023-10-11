import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/perguntas/Form.js";
import Grid from "./components/perguntas/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
    height: 3.5rem;
    width: 1024px;
  }
  @media (max-width: 820px) {
    height: 3.5rem;
    width: 820px;
  }
  @media (max-width: 640px) {
    height: 3.5rem;
    width: 640px;
  }
  @media (max-width: 500px) {
    height: 3rem;
    width: 500px;
  }
  @media (max-width: 420px) {
    height: 3rem;
    width: 420px;
  }
`;

const Title2 = styled.h2`
  color: #fff;
  font-size: 28px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 25px;
    display: flex;
    padding-left: 7%;
  }
  @media (max-width: 820px) {
    margin-top:1%;
    font-size: 22px;
    display: flex;
    padding-left: 0.5%;
  }
   
  @media (max-width: 640px) {
    margin-top:1%;
    font-size: 22px;
    display: flex;
    padding-left: 10%;
  }
  @media (max-width: 500px) {
    margin-top:1%;
    font-size: 18px;
    display: flex;
    padding-left: 5%;
  }
  @media (max-width: 420px) {
    font-size: 20px;
    display: flex;
    padding-left: 1%;
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


function Perguntas() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [filteredOption, setFilteredOption] = useState("");

  const getUsers = async () => {
    try {
      const res = await axios.get("http://avaliacao.cooperval.coop.br:8815/perguntas/");
      setUsers(res.data.sort((a, b) => (a.id_item_avaliacao > b.id_item_avaliacao ? 1 : -1)));
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
            <h2>Cadastro de Perguntas</h2>
            <Image src={logo} alt="Logo"/>{/**/}
          </Title2>
        </Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}  setFilteredOption={setFilteredOption}/>
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} filteredOption={filteredOption}/>
      </Container>
       <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Perguntas;
