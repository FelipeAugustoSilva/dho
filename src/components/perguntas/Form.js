import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  width: 1160px;
  background-color: #fff;
  display: flex; 
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 1px;
  align-items: flex-end;
  gap: 5px;
  margin: 10px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    width: 924px;
    padding: 20px;
    display: flex;
    justify-content: space-between; 
  }
  @media (max-width: 820px) {
    width: 720px;
    padding: 20px;
    display: flex;
    justify-content: space-between; 
  }
  @media (max-width: 640px) {
    width: 540px;
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

const FlexRow = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente os elementos */
  align-items: center; /* Centraliza verticalmente os elementos */
  flex-direction: row;
  Label {
    font-size: 18px;
  }
`;
const FlexRow2 = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  Label{
    font-size: 18px;
  }
  
`
const InputArea2 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 6px 10px;
  Label{
    font-size: 18px;
  }
  input{
    width: 40px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 1px;
    height: 39px;
    margin-right: 10px
  }

`

const InputArea = styled.div`
  
  height: 70px;
  select {
    width: 1090px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 1px;
  }
  
  @media (max-width: 1024px) {
    select {
      width: 855px;
    } 
  }
  @media (max-width: 820px) {
    select {
      width: 650px;
    } 
  }
  @media (max-width: 640px) {
    select {
      width: 470px;
    } 
  }
  @media (max-width: 500px) {
    select {
      width: 330px;
    }
  }
  @media (max-width: 420px) {
    select {
      width: 250px;

    }
  }
`;

const InputArea3 = styled.div``;
const InputArea4 = styled.div`
    margin: 24px auto auto auto;
 
`;
const Input = styled.input`
  width: 990px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 40px;

  @media (max-width: 1024px){
    width: 750px;
  }
  @media (max-width: 820px) {
    width: 560px;
  }
  @media (max-width: 640px) {
    width: 365px;
  }
  @media (max-width: 500px) {
    width: 225px;
  }
  @media (max-width: 420px) {
    width: 145px;
  }
`;

const Input2 = styled.input`
  width: 50px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;

  @media (max-width: 640px) {
    height: 30px;
  }
  @media (max-width: 500px) {
    height: 35px;
  }
  
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 17px;

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
  height: 42px;
  font-weight: bold;
  
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #0D7E48;
  }
`;


const Form = ({ getUsers, onEdit, setOnEdit, setFilteredOption }) => {
  const ref = useRef();
  const [avaliacoesOptions, setAvaliacoesOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [descricaoValue, setDescricaoValue] = useState("");
  const [idItemAvaliacaoValue, setIdItemAvaliacaoValue] = useState("");

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
        window.location.href = 'http://avaliacao.cooperval.coop.br/login';
      }
    } else {
      // Se o parâmetro 'login' não estiver presente na URL, redirecionar para a página de login
      window.location.href = 'http://avaliacao.cooperval.coop.br/login';
    }
  }, []);
  
  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await axios.get("http://avaliacao.cooperval.coop.br:8815/perguntas/tab_sistema_avaliacao");
        setAvaliacoesOptions(response.data);
      } catch (error) {
        console.error("Erro ao obter avaliações:", error);
      }
    };

    fetchAvaliacoes();
  }, []);

  useEffect(() => {
    if (onEdit) {
      setSelectedOption(onEdit.id_avaliacao);
      setIdItemAvaliacaoValue(onEdit.id_item_avaliacao);
      setDescricaoValue(onEdit.descricao);
    }
  }, [onEdit]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDescricaoChange = (e) => {
    setDescricaoValue(e.target.value);
  };

  const handleIdItemAvaliacaoChange = (e) => {
    setIdItemAvaliacaoValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!descricaoValue || !selectedOption || !idItemAvaliacaoValue) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      const requestData = {
        descricao: descricaoValue,
        id_avaliacao: selectedOption,
        id_item_avaliacao: idItemAvaliacaoValue,
      };

      if (onEdit) {
        await axios.put("http://avaliacao.cooperval.coop.br:8815/perguntas/" + onEdit.id_item_avaliacao, requestData);
      } else {
        await axios.post("http://avaliacao.cooperval.coop.br:8815/perguntas/", requestData);
      }

      user.descricao.value = "";
      user.id_avaliacao.value = "";
      user.id_item_avaliacao.value = "";
      setIdItemAvaliacaoValue("");
      setDescricaoValue("");
      setSelectedOption("");
      setOnEdit(null);
      getUsers();
      toast.success("Dados salvos com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar os dados.");
    }
  };

  const handleFilterClick = (selectedValue) => {
  if (selectedValue) {
    setFilteredOption(selectedValue);
  } else {
    toast.warn("Selecione uma opção antes de pesquisar.");
  }
};



  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <FlexRow>
        <InputArea>
          <Label>Escolha um módulo:</Label>
          {avaliacoesOptions.length > 0 ? (
            <select
              name="id_avaliacao"
              onChange={(e) => {
                const selectedValue = e.target.value; // Captura o valor selecionado
                handleSelectChange(e);
                if (selectedValue !== "") {
                  // Executa a função de filtro somente se um valor válido for selecionado
                  handleFilterClick(selectedValue);
                }
              }}
              value={selectedOption}
            >
              <option value="">Escolha uma opção</option>
              {avaliacoesOptions.map((avaliacao) => (
                <option key={avaliacao.id_avaliacao} value={avaliacao.id_avaliacao}>
                  {avaliacao.descricao}
                </option>
              ))}
            </select>
          ) : (
            <p>Carregando...</p>
          )}
        </InputArea>

        <InputArea2>
          <Label>ID:</Label>
          <Input2 name="id_avaliacao" value={selectedOption} />
        </InputArea2>
      </FlexRow>
      <FlexRow2>
        <InputArea3>
          <Label>Crie uma pergunta:</Label>
          <Input
            name="descricao"
            type="text"
            onChange={handleDescricaoChange}
            value={descricaoValue}
          />
        </InputArea3>
        <InputArea2>
          <Label>Item:</Label>
          <input
            name="id_item_avaliacao"
            value={idItemAvaliacaoValue}
            onChange={handleIdItemAvaliacaoChange}
          />
        </InputArea2>
        <InputArea4>
          <Button title="Clique aqui para salvar uma nova pergunta ou alteração" type="submit">Salvar</Button>
        </InputArea4>

      </FlexRow2>
    </FormContainer>
  );

};



export default Form;
