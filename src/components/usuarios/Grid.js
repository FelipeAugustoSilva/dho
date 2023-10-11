import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import styled from "styled-components";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const GridContainer = styled.div``;

const Table = styled.table`
  width: 1400px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 1px;
  margin: 20px auto;
  word-break: break-all;
  max-height: 2000px;
  overflow-y: scroll;


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

  @media (max-width: 640px) {
    align-items: center; 
    text-align: center;
  }
  @media (max-width: 420px) {
    align-items: center; 
    text-align: center;
  }
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
  @media (max-width: 420px) {
    padding-left: 10px;
    ${(props) => props.onlyWeb && "display: none"}
    
  }
`;

export const Td1 = styled.td`
  padding-top: 15px;
  text-align: center;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: row;
    padding-left: 10px;

    ${(props) => props.onlyWeb && "width: 80%"}

  }
  @media (max-width: 420px) {
    display: flex;
    flex-direction: row;
    padding-left: 10px;

    ${(props) => props.onlyWeb && "width: 80%"}
  }
`;
export const Td2 = styled.td`
  word-break: break-word;
  padding-top: 15px;
  padding-bottom: 5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
 
  @media (max-width: 640px) {
    display: flex;

    padding-left: 10px;
    width: 150px;
    ${(props) => props.onlyWeb && "display: none"}
    ${(props) => props.onlyWeb3 && "width: 80%"}
  }
  @media (max-width: 420px) {
    display: flex;

    padding-left: 10px;
    width: 150px;
    ${(props) => props.onlyWeb && "display: none"}
    ${(props) => props.onlyWeb3 && "width: 80%"}
  }
`;
export const Td3 = styled.td`
  display: flex;
  align-items: center;
  padding: 10px 15px; 
  width: 100%; 
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center; 
  gap: 10px; 
`;

const Input = styled.input`
  width: 345px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;

  @media (max-width: 640px) {
    width: 520px;
    height: 30px;
  }
  @media (max-width: 420px) {
    width: 220px;
    height: 35px;
  }
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  background-color:  #808080;
  color: white;
  width: 80px;
  height: 37px;
  font-weight: bold;
  margin: 8px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #0D7E48;
  }
`;


const Grid = ({ users, setUsers, setOnEdit }) => {
  const [tipoAvaliadorOptions, setTipoAvaliadorOptions] = useState([]);
  const [selectedOptionsMap, setSelectedOptionsMap] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTipoAvaliadorOptions(); //NOVO
    fetchSelectedOptions(); // Chame a função para buscar as opções salvas do backend
  }, []);
  const fetchSelectedOptions = async () => {
    try {
      const response = await axios.get('http://avaliacao.cooperval.coop.br:8815/usuarios/tpa'); //NOVO
      const selectedOptionsFromBackend = response.data;
      const optionsMap = {};

      selectedOptionsFromBackend.forEach(option => {
        if (!optionsMap[option.logon]) {
          optionsMap[option.logon] = [];
        }
        optionsMap[option.logon].push(option.id_tipoavaliador);
      });

      setSelectedOptionsMap(optionsMap);
    } catch (error) {
      console.error('Erro ao buscar as opções salvas:', error);
    }
  };

  const fetchTipoAvaliadorOptions = async () => {
    try {
      const response = await axios.get("http://avaliacao.cooperval.coop.br:8815/usuarios/tipoavaliador");
      const options = response.data.map(item => ({
        value: item.id_tipoavaliador,
        label: item.descricao
      }));
      setTipoAvaliadorOptions(options);
    } catch (error) {
      console.error("Erro ao buscar as opções do tipo avaliador:", error);
    }
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleSave = async (logon) => {
    const selectedOptions = selectedOptionsMap[logon];
    try {
      console.log("Starting handleSave for logon:", logon);
  
      // Remover todos os registros antigos associados a este logon
      await axios.delete(`http://avaliacao.cooperval.coop.br:8815/usuarios/tpa/${logon}`);
      console.log("Deleted old records for logon:", logon);
  
      // Inserir os novos registros com os itens selecionados
      const postRequests = selectedOptions.map(option => {
        const id_tipoavaliador = option.value;
  
        if (id_tipoavaliador) {
          console.log("Adding new record:", { logon, id_tipoavaliador });
          return axios.post(`http://avaliacao.cooperval.coop.br:8815/usuarios/tpa/`, {
            logon,
            id_tipoavaliador
          });
        }
  
        return null;
      });
  
      const validPostRequests = postRequests.filter(request => request !== null);
      await Promise.all(validPostRequests);
  
      const updatedSelectedOptionsMap = {
        ...selectedOptionsMap,
        [logon]: [], // Definir as opções como vazias após salvar
      };
      
      setSelectedOptionsMap(updatedSelectedOptionsMap);
  
      console.log("Records added successfully for logon:", logon);
      toast.success("Registros adicionados com sucesso.");
      
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };
  
  
 
  
  const handleDelete = async (logon) => {
    const userConfirmed = window.confirm("Tem certeza que deseja deletar esse usuário?");

    if (!userConfirmed) {
      return;
    }

    try {
      await axios.delete("http://avaliacao.cooperval.coop.br:8815/usuarios/" + logon);
      const newArray = users.filter((user) => user.logon !== logon);
      setUsers(newArray);
      toast.success("Usuário deletado com sucesso.");

      const searchButton = document.getElementById("searchButton"); // Supondo que o botão tenha o ID "searchButton"
      if (searchButton) {
        searchButton.click(); // Simular o clique no botão de pesquisa
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      toast.error("Erro ao deletar o usuário.");
    }
    setOnEdit(null);
  };

  const handleSearch = async (term) => {
    setIsLoading(true);
  
    try {
      const filtered = users.filter((user) => {
        const logon = user.logon ? user.logon.toLowerCase() : ''; // Verifica se user.logon é null ou undefined
        const name = user.name ? user.name.toLowerCase() : ''; // Verifica se user.name é null ou undefined
        const funcao = user.funcao ? user.funcao.toLowerCase() : ''; // Verifica se user.funcao é null ou undefined
  
        return (
          logon.includes(term.toLowerCase()) ||
          name.includes(term.toLowerCase()) ||
          funcao.includes(term.toLowerCase())
        );
      });
      setFilteredUsers(filtered);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    }
  
    setIsLoading(false);
    //setSearchTerm('');
  };

  return (
    <GridContainer>
      <Td3 colSpan="7">
        <InputContainer>
          <Input
            type="text"
            placeholder="Pesquisar... Ex: login, nome, função."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button id="searchButton" onClick={() => handleSearch(searchTerm)}>
            Pesquisar
          </Button>
        </InputContainer>
      </Td3>
      {isLoading ? (
        <p></p> 
      ) : (
        <Table >
          <Thead>

            <Tr>
              <Th onlyWeb>Username:</Th>
              <Th onlyWeb>Nome:</Th>
              <Th onlyWeb>Função:</Th>
              <Th onlyWeb>Tipo:</Th>

              <Th onlyWeb>Escolher:</Th>
              <Th onlyWeb>Sal:</Th>
              <Th onlyWeb>Alt:</Th>
              <Th onlyWeb>Del:</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((item, i) => (
              <Tr key={i}>
                <Td width="auto">{item.logon}</Td>
                <Td width="auto">{item.name}</Td>
                <Td2 width="auto" onlyWeb>{item.funcao}</Td2>
                <Td2 width="8%" onlyWeb3>
                  {selectedOptionsMap[item.logon] && selectedOptionsMap[item.logon].length > 0
                    ? selectedOptionsMap[item.logon].map(optionId => {
                      if (optionId === 1) {
                        return "AVALIADOR";
                      } else if (optionId === 2) {
                        return "AVALIADO";
                      } else {
                        return " ";
                      }
                    }).join('  ')
                    : "  "}
                </Td2>
                <Td1 width="12%" onlyWeb>
                  <Select
                    options={tipoAvaliadorOptions}
                    isMulti
                    isSearchable={false}
                    isClearable={false}
                    className="basic-single"
                    classNamePrefix="Selecione..."
                    onChange={(selectedOptions) => setSelectedOptionsMap(prevState => ({
                      ...prevState,
                      [item.logon]: selectedOptions
                    }))}
                  />
                </Td1>
                <Td alignCenter width="4%">
                  <FaSave onClick={() => handleSave(item.logon)} />
                </Td>
                <Td alignCenter width="4%">
                  <FaEdit onClick={() => handleEdit(item)} />
                </Td>
                <Td alignCenter width="4%" onlyWeb>
                  <FaTrash onClick={() => handleDelete(item.logon)} />
                </Td>
              </Tr>
            ))}
          </Tbody>

        </Table>
      )}
    </GridContainer>
  );
};


export default Grid;
