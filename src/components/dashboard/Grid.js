import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from "axios";


const Table = styled.table`
  display: flex;
  justify-content: space-around; 
  width: 1160px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 1px;
  align-items: flex-end;

  @media (max-width: 820px) {
    width: 800px;
    align-items: center; 
  }

  @media (max-width: 640px) {
    flex-direction: column;
    width: auto;
    align-items: center; 
  }
`;


const CreateButton = styled.a`
  display: flex; /* Torna o elemento flexível */
  align-items: center; /* Centraliza verticalmente o conteúdo */
  padding: 7px 15px; 
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px; 
  text-align: center;
  text-decoration: none;
  margin: 5px;
  transition: transform 0.3s;
  gap: 5px 5px 5px 10px;
  text-align: center;

  &:hover {
    transform: scale(1.1);
    background-color: #0D7E48;
  }

  @media (max-width: 1024px) {
    height: 50px;
  }
  @media (max-width: 640px) {
    width: 250px;
  }
`;



const Grid = () => {
  const [admin, setAdmin] = useState([]);

  //Ler o URL Hash
  const urlParams = new URLSearchParams(window.location.search);
  const loginEncoded = urlParams.get('login');
  const logon = atob(decodeURIComponent(loginEncoded));
  console.log('Fora do useEffect', logon);
  const logonEncoded = encodeURIComponent(btoa(logon));


  useEffect(() => {
    // Obter a URL atual
    const currentUrl = window.location.href;
  
    // Verificar se a URL contém o parâmetro 'login'
    if (currentUrl.includes('?login=')) {
      // Extrair o valor do parâmetro 'login' da URL
      const loginEncoded = currentUrl.split('?login=')[1];
      
      // Decodificar o valor do parâmetro 'login'
      const logon = atob(decodeURIComponent(loginEncoded));
  
      console.log('useEffect', logon);
  
      // Verificar se logon está presente
      if (!logon) {
        // Redirecionar para a página de login em .php (substitua pela URL correta)
        //window.location.href = 'http://avaliacao.cooperval.coop.br/login';
      }
    } else {
      // Se o parâmetro 'login' não estiver presente na URL, redirecionar para a página de login
      //window.location.href = 'http://avaliacao.cooperval.coop.br/login';
    }
  }, []);
  



  //Funções para direcionar adicionando o logon no URL
  const handleClick = () => {
    const url = `http://avaliacao.cooperval.coop.br/avaliacao/?login=${logonEncoded}`;
    window.location.href = url;
  };
  const handleClick2 = () => {
    const url = `http://avaliacao.cooperval.coop.br/usuarios/?login=${logonEncoded}`;
    window.location.href = url;
  };
  const handleClick3 = () => {
    const url = `http://avaliacao.cooperval.coop.br/perguntas/?login=${logonEncoded}`;
    window.location.href = url;
  };
  const handleClick4 = () => {
    const url = `http://avaliacao.cooperval.coop.br/modulos/?login=${logonEncoded}`;
    window.location.href = url;
  };
  const handleClick5 = () => {
    const url = `http://avaliacao.cooperval.coop.br/relatorio/?login=${logonEncoded}`;
    window.location.href = url;
  };







  useEffect(() => {
    fetchAdmin();

  });




  const fetchAdmin = async () => {
    try {
      console.log('Iniciando fetchAdmin');
      const response = await axios.get("http://avaliacao.cooperval.coop.br:8815");

      
      const data = response.data;
      //console.log('logon', logon);

      // Aqui, você pode acessar os campos desejados do objeto 'data'.
      const userData = data.find(item => item.logon === logon);

      if (userData) {
        const adminValue = userData.admin;
        setAdmin(adminValue);
        console.log(`O usuario: ${logon} possui atribuição de Admin: ${adminValue}`);
        if (adminValue === "Nao" || adminValue === "") {
          DesativarBotao();
        }
      } else {
        console.log(`Usuário não encontrado para o logon: ${logon}`);
      }


    } catch (error) {
      console.error("Erro ao buscar o admin:", error);
    }
  };




  function DesativarBotao() {
    // Seleciona todos os elementos com a classe 'desativaBotao'
    const botoes = document.querySelectorAll('.desativaBotao');

    // Itera sobre os botões e define o estilo 'display' como 'none' para torná-los invisíveis
    botoes.forEach((botao) => {
      botao.style.display = 'none';
    });
  }












  return (
    <Table>
      <CreateButton onClick={handleClick4} className='desativaBotao'> {/*onClick={handleClick4} className='desativaBotao'*/}
        Criar as avaliações
      </CreateButton>
      <CreateButton onClick={handleClick3} className='desativaBotao'> {/*onClick={handleClick3} className='desativaBotao'*/}
        Criar as perguntas
      </CreateButton>
      <CreateButton onClick={handleClick2} className='desativaBotao'> {/*onClick={handleClick2} className='desativaBotao'*/}
        Criar/editar os usuários
      </CreateButton>
      <CreateButton onClick={handleClick5} className='desativaBotao'> {/*onClick={handleClick5} className='desativaBotao'*/}
        Relatórios
      </CreateButton>
      <CreateButton onClick={handleClick}> {/*onClick={handleClick} */}
        Iniciar avaliação
      </CreateButton>
    </Table>
  );
};


export default Grid;
