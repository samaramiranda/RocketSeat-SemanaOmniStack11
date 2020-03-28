import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'; //importando a logo

export default function NewIncident() {
  const [title, setTitle] = useState(''); //criando estados para cada um dos campos do cadastro
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();//para enviar o usuario para a pagina de listagem dos casos

  const ongId = localStorage.getItem('ongId');//pegando o id da ong de dentro do storage do navegador

  async function handleNewIncident(e) {//função para cadastrar novo incidente
    e.preventDefault();

    const data = { //constante que guarda os dados do cadastro
      title, 
      description,
      value,
    };

    try {
      await api.post('incidents', data, { //passando os dados salvos na constante data para a api
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    } catch(err) {
      alert('Erro ao cadastrar caso. Tente novamente')
    }
  }

  return (
    <div className="new-incident-container">
    <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"></img>

        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhadamento para encontrar um herói para resolver isso.</p>

        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
          Voltar para home
        </Link>
      </section>

      <form onSubmit={handleNewIncident}>
        <input 
          placeholder="Título do caso"
          value={title}
          onChange={e => setTitle(e.target.value)}
        ></input>

        <textarea 
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>

        <input 
          placeholder="Valor em reais"
          value={value}
          onChange={e => setValue(e.target.value)}
        ></input>

        <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
  );
}
