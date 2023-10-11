import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Grid from "./components/dashboard/Grid.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    width: 1124px;
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
    font-size: 26px;
    justify-content: space-around;
  }
  @media (max-width: 640px) {
    margin-top:2%;
    font-size: 25px;
    padding-left: 17vw;
    justify-content: flex-start;
  }
  @media (max-width: 420px) {
    font-size: 25px;
    margin-top:2%;
    padding-left: 17vw;
    justify-content: flex-start;
  } 
`;

const Image = styled.img`
  width: 180px;
  height: 40px;
  display: block; 

  @media (max-width: 820px) {
    width: 140px;
  }
  
  @media (max-width: 500px) {
    display: none; 
  }
`;

function Dashboard() {
  console.log('Dashboard renderizado');
  return (
    <>
      <Container>
        <Title>
          <Title2>
            <h2>Dashboard</h2>
            <Image src={logo} alt="Logo"/>
          </Title2>
        </Title>
        <Grid />
      </Container>
       <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Dashboard;
