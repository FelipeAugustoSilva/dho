import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
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

export const Tbody = styled.tbody``;

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

const ThText = styled.span`
  display: block;
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1000px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    display: none;
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
    width: 75%;
    padding-left: 10px;
    ${(props) => props.onlyWeb && "display: none"}
  }
  @media (max-width: 420px) {
    width: 73%;
    padding-left: 10px;
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td1 = styled.td`
  padding-top: 15px;
  text-align: center;
  
`;
export const Td2 = styled.td`
  padding-top: 15px;
  text-align: center;
  display: none; /* Inicialmente oculta */

  @media (min-width: 3000px) {
    /* Define o display apenas quando a largura for maior que 640px */
    display: ${(props) => (props.onlyWeb2 ? "table-cell" : "none")};
  }
`;

const Grid = ({ users, setUsers, setOnEdit, filteredOption }) => {
  
  const filteredUsers = users.filter((user) => {
    if (filteredOption) {
      console.log("Filtered Option:", filteredOption);
      console.log("User ID_Avaliacao:", user.id_avaliacao);
      return user.id_avaliacao.toString() === filteredOption.toString();
    } else {
      return true;
    }
  });


  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id_item_avaliacao) => {
    const userConfirmed = window.confirm("Tem certeza que deseja deletar essa pergunta?");
  
    if (!userConfirmed) {
      return;
    }
  
    try {
      await axios.delete("http://avaliacao.cooperval.coop.br:8815/perguntas/" + id_item_avaliacao);
      const newArray = users.filter((user) => user.id_item_avaliacao !== id_item_avaliacao);
      setUsers(newArray);
      toast.success("Pergunta deletada com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      toast.error("Erro ao deletar a pergunta.");
    }
    setOnEdit(null);
  };
  


  return (
    <Table>
      <Thead>
        <Tr>
          <Th onlyWeb>Perguntas:</Th>
          <Th onlyWeb>ID:</Th>
          <Td2 onlyWeb2>ID2:</Td2>
          <Th onlyWeb>
            <ThText>Alterar:</ThText>
          </Th>
          <Th onlyWeb>
            <ThText>Deletar:</ThText>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
      {filteredUsers.map((item, i) => (
          <Tr key={i}>
            <Td width="76%">{item.descricao}</Td>
            <Td1 width="8%" onlyWeb>
              {item.id_item_avaliacao}
            </Td1>
            <Td2 width="8%" onlyWeb2>
              {item.id_avaliacao}
            </Td2>
            <Td alignCenter width="8%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="8%">
              <FaTrash onClick={() => handleDelete(item.id_item_avaliacao)} />
            </Td>
          </Tr>
        ))}
        {filteredUsers.length === 0 && (
          <Tr>
            <Td colspan="5">Nenhum item corresponde à seleção.</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};


export default Grid;
