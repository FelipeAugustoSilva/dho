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

export const Td1 = styled.td`
  padding-top: 15px;
  text-align: center;
`;


const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id_avaliacao) => {
    await axios
      .delete("http://avaliacao.cooperval.coop.br:8815/modulos/" + id_avaliacao)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id_avaliacao !== id_avaliacao);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };


  return (
    <Table>
      <Thead>
        <Tr>
          <Th onlyWeb>Descrição:</Th>
          <Th onlyWeb>Máscara:</Th>
          <Th onlyWeb>Alterar:</Th>
          <Th onlyWeb>Deletar:</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="70%">{item.descricao}</Td>
            <Td1 width="10%" onlyWeb>
              {item.mascara}
            </Td1>
            <Td alignCenter width="10%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="10%">
              <FaTrash onClick={() => handleDelete(item.id_avaliacao)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
