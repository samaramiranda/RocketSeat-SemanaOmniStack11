import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg'; //importando a logo

export default function Register() {
  const [name, setName] = useState(''); //criando estado para cada um dos inputs para pegar os dados da api
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory(); //para enviar o usuário de volta para a pagina inicial

  async function handleRegister(e) {
    e.preventDefault(); //para impedir que o formulário recarregue a página
  
    const data = { //guardando os dados digitados nos campos em uma constante
      name,
      email,
      whatsapp,
      city,
      uf
    };

    //testando se o cadastro foi feito com sucesso, se sim armazena os dados, se não retorna mensagem de erro
    try {
      const response = await api.post('ongs', data); //enviando os dados da constante date para a api (dentro do response também terei o id da ong)
  
      alert(`Seu ID de acesso ${response.data.id}`);  
      history.push('/');//enviando o usuário de volta para a pagina inicial
    } catch(err) {
      alert('Erro no cadastro, tente novamente.')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"></img>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)} //estou pegando o evento de mudança e colocando o valor do input dentro da variável name do estado
          ></input>

          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></input>

          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          ></input>

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            ></input>

            <input 
              placeholder="UF" 
              style={{ width:80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            ></input>
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}