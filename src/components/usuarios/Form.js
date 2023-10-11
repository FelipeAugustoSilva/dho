import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  width: 1360px;
  background-color: #fff;
  justify-content: space-between; 
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
    width: 730px;
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
  padding: 10px;

  select {
    width: 170px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 1px;
    height: 37px;
  }

`;

const Input = styled.input`
  width: 445px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;

  @media (max-width: 1024px) {
    width: 350px;
    height: 37px;
  }
  @media (max-width: 820px) {
    width: 190px;
    height: 37px;
  }
  @media (max-width: 640px) {
    width: 270px;
    height: 37px;
  }
  @media (max-width: 420px) {
    width: 300px;
    height: 35px;
  }
`;

const Input2 = styled.input`
  width: 745px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;
  
  @media (max-width: 1024px) {
    width: 500px;
    height: 37px;
  }
  @media (max-width: 820px) {
    width: 190px;
    height: 37px;
  }
  @media (max-width: 640px) {
    width: 350px;
    height: 37px;
  }
  @media (max-width: 420px) {
    width: 300px;
    height: 35px;
  }
  
`;

const Input4 = styled.input`
  width: 555px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 37px;

  @media (max-width: 1024px) {
    width: 500px;
    height: 37px;
  }
  @media (max-width: 820px) {
    width: 190px;
    height: 37px;
  }
  @media (max-width: 640px) {
    width: 300px;
    height: 37px;
  }
  @media (max-width: 420px) {
    width: 300px;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  margin: 19px 1px 1px 1px;
  @media (max-width: 640px) {
    flex-direction: row;
  }
  @media (max-width: 420px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  background-color:  #808080;
  color: white;
  width: 70px;
  height: 52px;
  font-weight: bold;
  margin: 8px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #0D7E48;
  }
  @media (max-width: 640px) {
    width: 100px;
  }
  @media (max-width: 420px) {
    width: 120px;
  }
`;

const Div = styled.td`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    justify-content: flex-end;
    flex-direction: row;
  }
  @media (max-width: 820px) {
    justify-content: flex-end;
    flex-direction: row;
  }
  @media (max-width: 640px) {
    flex-direction: column;
  }

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const Div2 = styled.td`




`;

const Div3 = styled.td`
  display: flex;
  justify-content: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
  @media (max-width: 420px) {
    flex-direction: column;
  }
  
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  const getTipoAvaliadorOptions = async () => {
    try {
      const response = await axios.get("http://avaliacao.cooperval.coop.br:8815/usuarios/tipoavaliador");
      const options = response.data.map(item => ({
        value: item.id_tipoavaliador,
        label: item.descricao
      }));
      return options;
    } catch (error) {
      console.error("Error fetching tipo avaliador options:", error);
      return [];
    }
  };
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.logon.value = onEdit.logon;
      user.name.value = onEdit.name;
      user.funcao.value = onEdit.funcao;
      user.password.value = onEdit.password;
      user.admin.value = onEdit.admin;
    }

    // Fetch opções do tipo de avaliador
    getTipoAvaliadorOptions().then(options => {

    });
  }, [onEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    const logonValue = user.logon.value;
    const nameValue = user.name.value;
    const funcaoValue = user.funcao.value;
    const passwordValue = user.password.value;
    const adminValue = user.admin.value;

    console.log("Opção escolhida pelo usuário:", adminValue);

    if (!logonValue || !nameValue || !funcaoValue || !passwordValue || !adminValue) {
      return toast.warn("Preencha todos os campos!");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
      return toast.error("Senha deve ter no mínimo 8 caracteres, contendo letras e números.");
    }

    if (onEdit) {
      // Adicione um console.log aqui para verificar o valor de admin antes de enviar a atualização
      console.log("Valor escolhido em admin (Editar):", user.admin.value);

      await axios
        .put("http://avaliacao.cooperval.coop.br:8815/usuarios/" + onEdit.logon, {
          logon: user.logon.value,
          name: user.name.value,
          funcao: user.funcao.value,
          password: user.password.value,
          admin: user.admin.value,
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
      // Adicione um console.log aqui para verificar o valor de admin antes de enviar a criação
      console.log("Valor escolhido em admin (Adicionar):", user.admin.value);

      await axios
        .post("http://avaliacao.cooperval.coop.br:8815/usuarios/", {
          logon: user.logon.value,
          name: user.name.value,
          funcao: user.funcao.value,
          password: user.password.value,
          admin: user.admin.value,
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

    user.logon.value = "";
    user.name.value = "";
    user.funcao.value = "";
    user.password.value = "";

    setOnEdit(null);
    getUsers();
  };
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
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <Div3>
        <Div2>
          <Div>
            <InputArea>
              <Label>Username:</Label>
              <Input name="logon" type="text" />
            </InputArea>

            <InputArea>
              <Label>Nome:</Label>
              <Input2 name="name" type="text" />
            </InputArea>
          </Div>
          <Div>
            <InputArea>
              <Label>Função:</Label>
              <Input4 name="funcao" type="text" />
            </InputArea>

            <InputArea>
              <Label>Senha:</Label>
              <Input name="password" type="password" />
            </InputArea>

            <InputArea>
              <Label>Administrador:</Label>
              <select name="admin">
                <option value="" disabled selected>Selecione uma opção</option>
                <option value="Sim">Sim</option>
                <option value="Nao">Não</option>
              </select>
            </InputArea>
          </Div>
        </Div2>
        <Div>
          <ButtonContainer>
            <Button title="Novo" type="button" onClick={() => window.location.reload()}>
              Novo
            </Button>
            <Button title="Salvar" type="submit">
              Salvar
            </Button>

          </ButtonContainer>
        </Div>
      </Div3>

    </FormContainer>
  );
};

export default Form;


