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
  justify-content: center;
  align-items: center; 
  flex-direction: row;
  Label {
    font-size: 18px;
  }
`;
const FlexRow2 = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  Label{
    font-size: 18px;
  }
  
`;
const FlexRow3 = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  Label{
    font-size: 18px;
  }
  
`;
const InputArea = styled.div`
  .largura-custom {
    width: 200px; 
  }

  height: 70px;
  select {
    width: 1160px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 1px;
  }
  
  @media (max-width: 1024px) {
    select {
      width: 555px;
    } 
  }
  @media (max-width: 820px) {
    select {
      width: 720px;
    } 
  @media (max-width: 640px) {
    margin: 15px 0px;
    padding-left: 15px;
    select {
      width: 310px;

    }
  }

  @media (max-width: 420px) {
    margin: 15px 0px;
    padding-left: 15px;
    select {
      width: 310px;

    }
  }
`;
const InputArea2 = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin: 10px 0px;

  select {
    width: 220px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 1px;
  }

  @media (max-width: 1024px) {
    width: 924px;

    display: flex;
    justify-content: space-between; 
  }
  @media (max-width: 820px) {
    padding: 15px 0px;
    width: 540px;

  }
  @media (max-width: 640px) {
    padding: 15px 0px;
    width: 540px;

    display: flex;
    justify-content: space-between; 
    flex-direction: column;
  }
  @media (max-width: 420px) {
    padding: 15px 0px;
    width: 340px;

    margin: 2px 0px 0px 0px;
    flex-direction: column;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-left:15px;
  input{
    width: 900px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 1px;
    height: 40px;
  }

  @media (max-width: 1024px) {

  }
  @media (max-width: 820px) {
    input{
      width: 460px; 
    }
  }
  @media (max-width: 640px) {
    width: 540px;
    display: flex;
    justify-content: space-between; 
    flex-direction: column;
    margin-left:15px;
    input{
      width: 290px; 
    }
  }
  @media (max-width: 420px) {
    width: 340px;
    margin: 2px 0px 0px 0px;
    flex-direction: column;
    margin-left:15px;
    input{
      width: 290px; 
    }
  }
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 924px;
    display: flex;
    justify-content: space-between; 
  }
  @media (max-width: 640px) {
    width: 540px;
    display: flex;
    justify-content: space-between; 
    flex-direction: column;
    margin-left:15px;
    select {
      width: 310px; 
    }
  }
  @media (max-width: 420px) {
    width: 340px;
    margin: 2px 0px 0px 0px;
    flex-direction: column;
    margin-left:15px;
    select {
      width: 310px; 
    }
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
  background-color:   #808080;
  color: white;
  height: 42px;
  font-weight: bold;
  margin-left:5px;
  
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #0D7E48;
  }
`;
const Input = styled.input`
  width: 200px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 1px;
  height: 40px;

  @media (max-width: 1024px){
    width: 200px;
  }
  @media (max-width: 820px){
    width: 200px;
  }
  @media (max-width: 640px) {
    width: 290px;
  }

  @media (max-width: 420px) {
    width: 290px;
  }
`;




const Form = ({ getUsers, onEdit, setOnEdit, setFilteredOption }) => {
  const ref = useRef();
  const [avaliacoesOptions, setAvaliacoesOptions] = useState([]);
  const [selectedAvaliadorOption, setSelectedAvaliadorOption] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [aplicacoesOptions, setAplicacoesOptions] = useState([]);
  const [logon, setLogon] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nomeUsuario2, setNomeUsuario2] = useState("");
  const [isIniciarAvaliacaoEnabled, setIsIniciarAvaliacaoEnabled] = useState(false);

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


  const dadosUsuarios = async (logon) => {
    try {
      console.log("Iniciando a busca de dados de usuários...");

      const response = await axios.get("http://avaliacao.cooperval.coop.br:8815/avaliacao/tab_pessoas");

      console.log("Dados de usuários obtidos com sucesso!");

      const usuarioEncontrado = response.data.find((user) => user.logon === logon);

      if (usuarioEncontrado) {
        console.log("Usuário encontrado:", usuarioEncontrado);
        setNomeUsuario(usuarioEncontrado.name);
      } else {
        console.error("Usuário não encontrado");
        setNomeUsuario(""); // Limpa o nome se o usuário não for encontrado
      }
    } catch (error) {
      console.error("Erro ao obter avaliações:", error);
      setNomeUsuario(""); // Limpa o nome em caso de erro
    }
  };



  const dadosUsuarios2 = async (logon) => {
    try {
      console.log("Iniciando a busca de dados de usuários...");

      const response = await axios.get("http://avaliacao.cooperval.coop.br:8815/avaliacao/tab_pessoas");

      console.log("Dados de usuários obtidos com sucesso!");

      const usuarioEncontrado = response.data.find((user) => user.logon === logon);

      if (usuarioEncontrado) {
        console.log("Usuário encontrado:", usuarioEncontrado);
        setNomeUsuario2(usuarioEncontrado.name);
      } else {
        console.error("Usuário não encontrado");
        setNomeUsuario2(""); // Limpa o nome se o usuário não for encontrado
      }
    } catch (error) {
      console.error("Erro ao obter avaliações:", error);
      setNomeUsuario2(""); // Limpa o nome em caso de erro
    }
  };




  useEffect(() => {
    if (logon && selectedAvaliadorOption && selectedValue) {
      setIsIniciarAvaliacaoEnabled(true);
    } else {
      setIsIniciarAvaliacaoEnabled(false);
    }
  }, [logon, selectedAvaliadorOption, selectedValue]);



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginEncoded = urlParams.get('login');
    const logon = atob(decodeURIComponent(loginEncoded));
    console.log(logon);
    setLogon(logon);
    console.log("Valor de logon:", logon);

    const fetchAplicacoes = async () => {
      try {
        const response = await axios.get("http://avaliacao.cooperval.coop.br:8815/avaliacao/tab_pessoa_avaliador");
        setAplicacoesOptions(response.data);

        // Verificar se o logon tem id_tipoavaliador igual a 1
        const userWithIdTipoAvaliador1 = response.data.find(item => item.logon === logon && item.id_tipoavaliador === 1);
        if (userWithIdTipoAvaliador1) {
          console.log("Avaliador", userWithIdTipoAvaliador1);
        } else {
          // Exibir um alerta se o usuário não for um Avaliador
          window.alert("Você não possui atribuição de Avaliador, por favor entre em contato com o RH.");
          window.location.href = 'http://avaliacao.cooperval.coop.br/';
        }
      } catch (error) {
        console.error("Erro ao obter avaliações:", error);
      }
    };

    dadosUsuarios(logon);
    fetchAplicacoes();
  }, []);








  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await axios.get("http://avaliacao.cooperval.coop.br:8815/avaliacao/tab_sistema_avaliacao");
        setAvaliacoesOptions(response.data);
      } catch (error) {
        console.error("Erro ao obter avaliações:", error);
      }
    };

    fetchAvaliacoes();
  }, []);



  const handleFilterClick = () => {
    if (selectedValue) {
      setFilteredOption(selectedValue);
      console.log("Valor definido para filteredOption:", selectedValue);
    } else {
      toast.warn("Selecione uma opção antes de pesquisar.");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAvaliadorOption || !selectedValue) {
      return toast.warn("Preencha todos os campos!");
    }
    try {
      const requestData = {
        logon_avaliador: logon,
        logon_avaliado: selectedAvaliadorOption,
        id_avaliacao: selectedValue,
      };

      let response;
      let insertedId = null;

      if (onEdit) {
        response = await axios.put(
          "http://avaliacao.cooperval.coop.br:8815/avaliacao" + onEdit.id_aplicacaoavaliacao,
          requestData
        );
      } else {
        response = await axios.post("http://avaliacao.cooperval.coop.br:8815/avaliacao", requestData);
      }

      if (response.data && response.data.insertedId) {
        insertedId = response.data.insertedId;
        console.log("insertedId no handleSubmit:", insertedId);



        const url = new URL(window.location.href);
        url.searchParams.set("XYZinsertedId", insertedId);
        window.history.pushState({}, '', url.toString());
      }

      setOnEdit(null);
      getUsers();
      toast.success("Dados salvos com sucesso!");
      return true;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Tratar o erro 400, que indica inserção duplicada
        return false; // Indicador de duplicação de entrada
      } else {
        // Tratar outros erros
        console.error("Erro ao salvar dados:", error);
        toast.error("Erro ao salvar dados.");
        return false; // Indicador de falha geral
      }
    }
  };




  const uniqueLogons = [...new Set(aplicacoesOptions.filter(avaliacao2 => avaliacao2.id_tipoavaliador === 2).map(avaliacao2 => avaliacao2.logon))];




  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>


      <FlexRow2>
        <InputArea2>
          <Div2>
            <Label>Logon Avaliador:</Label>
            <Input name="logon_avaliador" value={logon} readOnly disabled />
          </Div2>
          <Div>
            <Label>Nome:</Label>
            <input name="name" value={nomeUsuario} readOnly disabled />
          </Div>
        </InputArea2>


        <InputArea2 >
          <Div2>
            <Label>Logon Avaliado:</Label>
            {uniqueLogons.length > 0 ? (
              <select className="largura-custom"
                name="logon_avaliado"
                isSearchable={true}
                onChange={(e) => {
                  const selectedLogon = e.target.value;
                  console.log("Selected logon:", selectedLogon);
                  setSelectedAvaliadorOption(selectedLogon);
                  dadosUsuarios2(selectedLogon);
                }}
                value={selectedAvaliadorOption}
              >
                <option value="">Escolha uma opção</option>
                {uniqueLogons.map((logon) => (
                  <option
                    key={logon}
                    value={logon}
                  >
                    {logon}
                  </option>
                ))}
              </select>
            ) : (
              <p>Carregando...</p>
            )}
          </Div2>
          <Div>
            <Label>Nome:</Label>
            <input name="name" value={nomeUsuario2} readOnly />
          </Div>

        </InputArea2>
      </FlexRow2>


      <FlexRow>
        <InputArea>
          <Label>Escolha uma avaliação:</Label>
          {avaliacoesOptions.length > 0 ? (
            <select
              name="id_avaliacao"
              onChange={(e) => setSelectedValue(e.target.value)}
              value={selectedValue}
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
      </FlexRow>


      <FlexRow3>
        <Button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            const result = await handleSubmit(e);
            if (!result) {
              // Exibir toasty de erro aqui, pois a avaliação é duplicada
              toast.error("Entrada duplicada: Os valores já existem na tabela.");
              return;
            }
            // Apenas chamar handleFilterClick quando a inserção for bem-sucedida
            handleFilterClick();
          }}
          disabled={!isIniciarAvaliacaoEnabled}
        >
          Iniciar Avaliação
        </Button>
      </FlexRow3>



    </FormContainer>
  );

};



export default Form;
