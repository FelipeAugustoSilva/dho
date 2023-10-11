import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaSave } from "react-icons/fa";
import Select from 'react-select';
import { toast } from "react-toastify";


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
    width: 760px;
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
  @media (max-width: 640px) {
    Tr {
      display: flex;
      flex-direction: column;
    }
    
    Td4,
    Td5 {
      width: 100%; 
    }
  }
  @media (max-width: 520px) {
    Tr {
      display: flex;
      flex-direction: column;
    }
    
    Td4,
    Td5 {
      width: 100%; 
    }
  }
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
export const Td1 = styled.td`
  padding-top: 15px;
  text-align: center;
  
`;
export const Td4 = styled.td`
  padding-top: 15px;
  text-align: center;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    ${(props) => props.onlyWeb3 && "width: 80%"}
  }
  
  @media (max-width: 420px) {
    flex-direction: column;
    align-items: center;
    ${(props) => props.onlyWeb3 && "width: 80%"}
  }
`;


export const Td5 = styled.td`
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
export const Td2 = styled.td`
  padding-top: 15px;
  text-align: center;
  display: none; /* Inicialmente oculta */
  
  @media (min-width: 3000px) {
    display: ${(props) => (props.onlyWeb2 ? "table-cell" : "none")};
  }
`;
export const Td3 = styled.td`
  padding-top: 15px;
  text-align: center;
  display: none; /* Inicialmente oculta */

  @media (min-width: 3000px) {
    /* Define o display apenas quando a largura for maior que 640px */
    display: ${(props) => (props.onlyWeb2 ? "table-cell" : "none")};
  }
`;
const CreateButton = styled.a`
  display: inline-block;
  bottom: 10px; 
  right: 20px; 
  z-index: 999; 
  padding: 10px 20px;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  text-decoration: none;

  margin: 0.1% 32%;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #0D7E48;
  }
  @media (max-width: 1024px) {
    margin: 0.1% 29%;

  }
  @media (max-width: 640px) {
    margin: 0.1% 20%;

  }
  @media (max-width: 420px) {
    font-size: 18px;
    margin: 0.1% 13%;

  }
`;

const Grid = ({ users, filteredOption }) => {
  const [tipoAvaliadorOptions, setTipoAvaliadorOptions] = useState([]);
  const [isVisible, setIsVisible] = useState(!!filteredOption);
  const filteredOptionAsNumber = filteredOption ? parseInt(filteredOption, 10) : null;
  const [insertedId, setInsertedId] = useState(null);



  const urlParams = new URLSearchParams(window.location.search);
  const queryString = urlParams.get('login');
  let logon = null;
  
  if (queryString) {
    const loginValue = queryString.split('&')[0];
    const loginDecoded = decodeURIComponent(loginValue);
    logon = atob(loginDecoded);
    //console.log("Login:", logon);
  } else {
    console.log("Login não encontrado na URL.");
  }
  
  // Agora você pode acessar logon aqui fora do bloco if
  //console.log("Valor de logon fora do bloco if:", logon);
  
  
  const loginEncoded = encodeURIComponent(btoa(logon));
  console.log(loginEncoded);




  const handleInsertedId = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("XYZinsertedId");
    //console.log("procurando", id)

    if (id) {
      setInsertedId(id);
    }
  };


  const executeHandleInsertedIdWithDelay = useCallback(() => {
    setTimeout(() => {
      handleInsertedId();
    }, 3000); // 3 segundos
  }, [handleInsertedId]);
  

  //console.log("Valor de insertedId:", insertedId);


  useEffect(() => {
    executeHandleInsertedIdWithDelay();
    setIsVisible(!!filteredOption);
  }, [executeHandleInsertedIdWithDelay, filteredOption]);


  const filteredUsers = users.filter((user) => {
    if (filteredOptionAsNumber !== null) {
      return user.id_avaliacao === filteredOptionAsNumber;
    } else {
      return true;
    }
  });


  useEffect(() => {
    fetchTipoAvaliadorOptions();
  }, []);



  const fetchTipoAvaliadorOptions = async () => {
    try {
      const response = await axios.get("http://avaliacao.cooperval.coop.br:8815/avaliacao/tab_faixa_avaliacao");

      // Ordenar os dados com base no id_Faixa
      const sortedData = response.data.sort((a, b) => a.id_Faixa - b.id_Faixa);

      const options = sortedData.map(item => ({
        value: item.id_Faixa,
        label: item.descricao
      }));

      setTipoAvaliadorOptions(options);
    } catch (error) {
      console.error("Erro ao buscar as opções do tipo avaliador:", error);
    }
  };



  //Salvar e armazenar numero de Select contados
  let handleSaveItemCallCount = 0;

  const handleSaveItem = async (itemToUpdate) => {
    const { id_avaliacao, id_item_avaliacao } = itemToUpdate;
    const id_Faixa = itemToUpdate.selectedOption ? itemToUpdate.selectedOption.value : null; 

    try {
      const id_aplicacaoavaliacao = insertedId;

      const response2 = await axios.put('http://avaliacao.cooperval.coop.br:8815/avaliacao/tab_resultado_aplicacao', {
        id_avaliacao,
        id_item_avaliacao,
        id_Faixa,
        id_aplicacaoavaliacao,
      });

      console.log('Resposta do servidor (tab_resultado_aplicacao):', response2.data);

      // Incrementar a contagem de chamadas da função
      handleSaveItemCallCount++;
      //toast.success("Resposta salva com sucesso!");

      // Exiba a contagem de chamadas da função aqui, dentro do contexto da função
      console.log('Número de chamadas da função handleSaveItem:', handleSaveItemCallCount);
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
    }
  };




  //console.log('Número de chamadas da função handleSaveItem:', handleSaveItemCallCount);




  //Conta a quantidade de Select
  const countInitialSelects = (filteredUsers) => {
    return filteredUsers
      .map((item) => {
        if (
          parseFloat(item.id_item_avaliacao) !== 1.0 &&
          parseFloat(item.id_item_avaliacao) !== 2.0 &&
          parseFloat(item.id_item_avaliacao) !== 3.0 &&
          parseFloat(item.id_item_avaliacao) !== 4.0 &&
          parseFloat(item.id_item_avaliacao) !== 5.0 &&
          parseFloat(item.id_item_avaliacao) !== 6.0 &&
          parseFloat(item.id_item_avaliacao) !== 7.0 &&
          parseFloat(item.id_item_avaliacao) !== 8.0 &&
          parseFloat(item.id_item_avaliacao) !== 9.0 &&
          parseFloat(item.id_item_avaliacao) !== 10.0
        ) {
          return 1;
        } else {
          return 0;
        }
      })
      .reduce((total, selectCount) => total + selectCount, 0);
  };
  const initialSelectCount = countInitialSelects(filteredUsers);
  console.log("Quantos Select ", initialSelectCount);



  const handleFinalizarAvaliacao = async () => {
    try {
      if (insertedId) {
        // Itere sobre os itens no filteredUsers
        for (const item of filteredUsers) {
          // Chame handleSaveItem para salvar a seleção
          await handleSaveItem(item);
        }

        // Em seguida, finalize a avaliação
        const response = await axios.put(`http://avaliacao.cooperval.coop.br:8815/avaliacao/${insertedId}/finalizado`, {
          finalizado: "Sim",
        });

        console.log("Avaliação finalizada com sucesso!", response.data);
        toast.success("Avaliação finalizada com sucesso!");

        setTimeout(() => {
          const url = `http://avaliacao.cooperval.coop.br/?login=${loginEncoded}`;
          //const url = `http://avaliacao.cooperval.coop.br/relatorio/?login=${loginEncoded}&XYZinsertedId:${insertedId}`;
          window.location.href = url;
        }, 3000);
      } else {
        console.error("insertedId não está definido. Certifique-se de chamar handleInsertedId antes de handleFinalizarAvaliacao.");
        toast.error("Erro ao finalizar a avaliação: insertedId não está definido.");
      }
    } catch (error) {
      console.error("Erro ao finalizar a avaliação:", error);
    }
  };





  function hasUpperCase(word) {

    const upperCaseCount = [...word].filter((char) => char === char.toUpperCase()).length;
    return upperCaseCount > 3;
  }

  function formatText(text) {

    const words = text.split(' ');
    const formattedWords = words.map((word, index) => {

      const isUpperCase = hasUpperCase(word);

      const space = index < words.length - 1 ? ' ' : '';
      return isUpperCase ? <strong key={index}>{word + space}</strong> : word + space;
    });
    return formattedWords;
  }


  return (
    <div >
      {isVisible && (
        <Table>

          <Thead>

            <Tr>
              <Th onlyWeb>ID:</Th>
              <Th onlyWeb>Perguntas:</Th>
              <Td2 onlyWeb2>ID2:</Td2>
              <Th onlyWeb>Escolha uma opção:</Th>
              <Td2 onlyWeb3></Td2>
            </Tr>

          </Thead>

          <Tbody>
            {filteredUsers
              .slice()
              .sort((a, b) => a.id_item_avaliacao - b.id_item_avaliacao)
              .map((item, i) => (
                <Tr key={i}>
                  <Td width="5%" onlyWeb>
                    {item.id_item_avaliacao}
                  </Td>
                  <Td2 width="1%" onlyWeb2>
                    {item.id_avaliacao}
                  </Td2>
                  <Td5 width="70%">
                    {formatText(item.descricao)}
                  </Td5>
                  <Td4 width="20%" onlyWeb3>
                    {parseFloat(item.id_item_avaliacao) !== 1.0 &&
                      parseFloat(item.id_item_avaliacao) !== 2.0 &&
                      parseFloat(item.id_item_avaliacao) !== 3.0 &&
                      parseFloat(item.id_item_avaliacao) !== 4.0 &&
                      parseFloat(item.id_item_avaliacao) !== 5.0 &&
                      parseFloat(item.id_item_avaliacao) !== 6.0 &&
                      parseFloat(item.id_item_avaliacao) !== 7.0 &&
                      parseFloat(item.id_item_avaliacao) !== 8.0 &&
                      parseFloat(item.id_item_avaliacao) !== 9.0 &&
                      parseFloat(item.id_item_avaliacao) !== 10.0 ? (
                      <Select
                        options={tipoAvaliadorOptions}
                        isSearchable={false}
                        isClearable={false}
                        className="basic-single"
                        classNamePrefix="Selecione..."
                        onChange={(selectedOption) => {
                          item.selectedOption = selectedOption;
                        }}
                      />
                    ) : (
                      null
                    )}
                  </Td4>

                  <Td2 alignCenter width="4%" onlyWeb3>

                    <FaSave onClick={() => handleSaveItem(item, item.selectedOption)} />

                  </Td2>

                </Tr>
              ))}
            {filteredUsers.length === 0 && (

              <Tr>
                <Td >Nenhum item corresponde à seleção.</Td>
              </Tr>

            )}
          </Tbody>

        </Table>

      )}{isVisible && (
        <CreateButton onClick={handleFinalizarAvaliacao}>
          Finalizar avaliação!
        </CreateButton>
      )}
    </div>


  );
};


export default Grid;
