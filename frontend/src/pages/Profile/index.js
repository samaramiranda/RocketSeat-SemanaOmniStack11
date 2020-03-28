import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  
  const history = useHistory();//para enviar de volta para pagina inicial após o logout

  const ongId = localStorage.getItem('ongId'); //para pegar o nome da Ong logada de dentro do storage do navegador
  const ongName = localStorage.getItem('ongName'); //para pegar o nome da Ong logada de dentro do storage do navegador
  
  useEffect(() => {//para disparar uma função. 1 parametro: qual função que quero executar. 2 parametro: quando que essa função vai ser executada
    api.get('profile', { //para pegar todos os incidentes da rota profile da ong
      headers: {
        Authorization: ongId, //pegando o id da ong logada de dentro do header
      }
    }).then(response => {//gravando o id do header no estado do componente incidents
        setIncidents(response.data);
    });
  }, [ongId]);//toda vez que informação de dentro do array mudar eu executo a função do primeiro parametro dnv, se iniciar o array vazio executa a função só uma vez

  async function handleDeleteIncident(id) {//para deletar um incidente
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId, //passando o header de autorização para apenas a ong logada poder deletar o caso
      }
    });

      setIncidents(incidents.filter(incident => incident.id !== id));//para listar apenas os incidentes que não foram excluidos
    } catch(err){
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout() { //para fazer o logout no site
    localStorage.clear(); //limpa os dados do local history
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
      <img src={logoImg} alt="Be The Hero"></img>
      <span>Bem vinda, {ongName}</span>
      
      <Link className="button" to="/incidents/new">Cadastro novo caso</Link>
      <button onClick={handleLogout} type="button"> {/*chamando a função de fazer logout quando clica no botão*/}
        <FiPower size={18} color="#e02041"></FiPower>
      </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => ( //percorrendo todos os incidents e retornando eles em formato de lista
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
        
            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>
        
            <strong>VALOR:</strong>
            {/* Para formatar o campo de R$ */}
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p> 
        
            <button onClick={() => handleDeleteIncident(incident.id)} type="button">{/*passando função para deletar o incidente quando clicar no botão*/}
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}