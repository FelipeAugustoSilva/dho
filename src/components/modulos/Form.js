import axios from "axios";
import React, { useEffect, useRef } from "react";
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

const InputArea = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 905px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;

  @media (max-width: 1024px) {
    width: 800px;
    height: 35px;
  }
  @media (max-width:820px) {
    width: 690px;
    height: 35px;
  }
  @media (max-width: 640px) {
    width: 520px;
    height: 35px;
  }
  @media (max-width: 500px) {
    width: 420px;
    height: 35px;
  }
  @media (max-width: 420px) {
    width: 320px;
    height: 35px;
  }
`;

const Input2 = styled.input`
  width: 50px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;

  @media (max-width: 820px) {
    width: 80px;
  }

  @media (max-width: 640px) {
    height: 30px;
  }
  @media (max-width: 500px) {
    height: 35px;
    width: 80px;
  }
  
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 17px;

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  padding-left: 1px;

  @media (max-width: 500px) {
    justify-content: center; 
  }
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  background-color:  #808080;
  color: white;
  height: 42px;
  font-weight: bold;
  margin: 5px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color:  #0D7E48;
  }
`;


const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
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

  
  const urlParams = new URLSearchParams(window.location.search);
  const loginEncoded = urlParams.get('?login=');
  const logon = atob(decodeURIComponent(loginEncoded));
  console.log(logon)


  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.descricao.value = onEdit.descricao;
      user.mascara.value = onEdit.mascara;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    const descricaoValue = user.descricao.value;
    const mascaraValue = user.mascara.value;

    if (!descricaoValue || !mascaraValue) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://avaliacao.cooperval.coop.br:8815/modulos/" + onEdit.id_avaliacao, {
          descricao: user.descricao.value,
          mascara: user.mascara.value,
        })
        .then(({ data }) => toast.success(data))
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.error;
            const details = error.response.data.details;
            const dbError = error.response.data.dbError;
            console.log("Error:", errorMessage);
            console.log("Details:", details);
            console.log("Database Error:", dbError);
            toast.error("Erro ao editar: " + errorMessage);
          }
        });
    } else {
      await axios
        .post("http://avaliacao.cooperval.coop.br:8815/modulos/", {
          descricao: user.descricao.value,
          mascara: user.mascara.value,
        })
        .then(({ data }) => toast.success(data))
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.error;
            const details = error.response.data.details;
            const dbError = error.response.data.dbError;
            console.log("Error:", errorMessage);
            console.log("Details:", details);
            console.log("Database Error:", dbError);
            toast.error("Erro ao adicionar: " + errorMessage);
          }
        });
    }

    user.descricao.value = "";
    user.mascara.value = "";
    setOnEdit(null);
    getUsers();
  };


  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Descrição:</Label>
        <Input name="descricao" type="text" />
      </InputArea>
      <InputArea>
        <Label>Máscara:</Label>
        <Input2 name="mascara" />
      </InputArea>

      <ButtonContainer>
        <Button title="Salvar" type="submit">
          Salvar
        </Button>
        <Button title="Novo" type="button" onClick={() => window.location.reload()}>
          Novo
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default Form;


