import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; //para a rota do "não tenho cadastro"
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'; //importando a logo
import heroesImg from '../../assets/heroes.png'; //importando a imagem

export default function Logon() {
  const [id, setId] = useState(''); //estado para armazenar o id de logon
  const history = useHistory(); //para enviar o usuário para página de listagem de casos

  async function handleLogin(e) {//validando se a ONG existe
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id }); //verificando se o id da ong que tentou fazer login realmente existe na sessions de logon
      
      localStorage.setItem('ongId', id); //para salvar no store do navegador e ter o id disponível em toda a aplicação
      localStorage.setItem('ongName', response.data.name);
      
      history.push('/profile');
    } catch(err) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"></img>
      
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)} //estou pegando o evento de mudança e colocando o valor do id dentro da variável id do estado
          ></input>

          <button className="button" type="submit">Entrar</button>
        
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"></FiLogIn>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"></img>
    </div>
  );
}