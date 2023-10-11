import React, { useState, useEffect } from "react";
import styled from "styled-components";


const Div = styled.div`
`;
const Table = styled.table`
  width: 1200px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 1px;
  margin: 20px auto;
  word-break: break-all;

  @media (max-width: 1024px) {
    width: 965px;
    padding: 15px;
    margin: 10px 20px;
  }
  @media (max-width: 820px) {
    width: 780px;
    padding: 5px;
    margin: 10px 20px;
  }
  @media (max-width: 640px) {
    width: 580px;
    padding: 5px;
    margin: 10px 20px;
  }
  @media (max-width: 500px) {
    width: 480px;
    padding: 5px;
    margin: 10px 20px;
  }
  @media (max-width: 420px) {
    width: 370px;
    padding: 5px;
    margin: 5px 20px 10px;
    
  }

  
`;


export const Thead = styled.thead``;


export const Tbody = styled.tbody`
  padding-bottom: 25px; 
`;


export const Tr = styled.tr`
  text-align: center;
  padding-bottom: 25px;
`;


export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 640px) {
    ${(props) => props.onlyWeb && "display: none;"}
  }
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none;"}
  }
  @media (max-width: 420px) {
    ${(props) => props.onlyWeb && "display: none;"}
  }
`;


export const Td = styled.td`
  word-break: break-word;
  padding-top: 15px;
  padding-bottom: 5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
 
  @media (max-width: 640px) {
    padding-left: 10px;
    ${(props) => props.onlyWeb && "display: none"}
  }
  @media (max-width: 500px) {
    padding-left: 10px;
    ${(props) => props.onlyWeb && "display: none"}
  }
  @media (max-width: 420px) {
    padding-left: 10px;
    ${(props) => props.onlyWeb && "display: none"}
  }
`;


export const Th3 = styled.th`
  @media (max-width: 2640px) {
    ${(props) => props.onlyWeb2 && "display: none;"}
  }

`;


export const Td3 = styled.td`
  @media (max-width: 2640px) {
    ${(props) => props.onlyWeb2 && "display: none;"}
  }
`;


export const Td1 = styled.td`
  padding-top: 15px;
  text-align: start;
  text-overflow: ellipsis;
`;


export const Td2 = styled.td`
  padding-top: 15px;
  text-align: center;
`;


const Input = styled.input`
  width: 345px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;

  @media (max-width: 1024px) {
    width: 300px;
    height: 30px;
  }
  @media (max-width: 820px) {
    width: 300px;
    height: 35px;
    display: flex;
    justify-content: flex-start;
  }
  @media (max-width: 640px) {
    width: 300px;
    height: 35px;
  }
  @media (max-width: 420px) {
    width: 300px;
    height: 35px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px; /* Ajuste conforme necessário para o espaçamento desejado */
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  background-color:  #808080 ;
  color: white;
  width: 90px;
  height: 37px;
  font-weight: bold;
  margin: 8px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #0D7E48;
  }
`;


const Grid = ({ users }) => {
  //const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isLoading, setIsLoading] = useState(true);
  const [insertedId, setInsertedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');



  const urlParams = new URLSearchParams(window.location.search);
  const queryString = urlParams.get('login');
  let logon = null;
  let insertedId2 = null;
  console.log("insertedId:", insertedId);
  if (queryString) {
    const loginValue = queryString.split('&')[0];
    const loginDecoded = decodeURIComponent(loginValue);
    logon = atob(loginDecoded);

    // Agora, vamos verificar se existe o parâmetro "insertedId" na URL
    if (window.location.search.includes('insertedId')) {
      const insertedIdValue = window.location.search.split('insertedId:')[1];
      insertedId = parseInt(insertedIdValue, 10);
    }

    console.log("Login:", logon);
    console.log("insertedId2:", insertedId2);
  } else {
    console.log("Login não encontrado na URL.");
    window.location.href = 'http://avaliacao.cooperval.coop.br/login';
  }


  const loginEncoded = encodeURIComponent(btoa(logon));
  //console.log(loginEncoded);


  const handleDashboard = () => {
    const url = `http://avaliacao.cooperval.coop.br/?login=${loginEncoded}`;
    window.location.href = url;
  };


  useEffect(() => {
    if (insertedId !== null) {
      setSearchTerm(insertedId);
      handleSearchButtonClick();
    }
  }, [insertedId]);


  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };


  const handleSearchButtonClick = () => {
    console.log('Filtrando pelo valor:', searchTerm);
    const filteredUsers = users.filter((item) =>

      Object.values(item).some((value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          } else {
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
          }
        }
        return false;
      })
    );
    setFilteredUsers(filteredUsers);
    setIsLoading(false);
  };


  return (

    <div>
      <Div>
        <Input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <ButtonContainer>
          <Button onClick={() => setInsertedId(searchTerm)}>Pesquisar</Button>
          <Button onClick={handleDashboard}>Dashboard</Button>
        </ButtonContainer>
      </Div>

      {isLoading ? (
        <p></p>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th onlyWeb2>ID:</Th>
              <Th onlyWeb>Avaliador:</Th>
              <Th onlyWeb>Avaliado:</Th>
              <Th onlyWeb>Avaliação:</Th>
              <Th onlyWeb>Pergunta:</Th>
              <Th onlyWeb>Resposta:</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((item, i) => (
              <React.Fragment key={i}>

                <Tr>
                  <Td1 width="3%" onlyWeb>{item.id_aplicacaoavaliacao}</Td1>
                  <Td1 width="15%" onlyWeb>{item.nome_avaliador}</Td1>
                  <Td1 width="15%" onlyWeb>{item.nome_avaliado}</Td1>
                  <Td1 width="20%" onlyWeb>{item.descricao_sistema_avaliacao}</Td1>
                  <Td1 width="34%" onlyWeb>{item.id_item_avaliacao} - {item.descricao_item_avaliacao}</Td1>
                  <Td2 width="auto" onlyWeb>{item.descricao_faixa_avaliacao}</Td2>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>

      )}
    </div>
  );
};

export default Grid;
