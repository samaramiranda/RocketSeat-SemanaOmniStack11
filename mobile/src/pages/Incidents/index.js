import React, { useState, useEffect } from 'react';
import { Feather }  from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; //para criar a navegação entre páginas
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api'; //importando a api em node

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]); //criando estado para os incidentes
  const [total, setTotal] = useState(0);//criando estado o total de incidentes cadastrados
  const [page, setPage] = useState(1); //controlando o número da página para criar paginação infinita
  const [loading, setLoading] = useState(false);//para carregar uma página por vez

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });//para navegar para a página Detail e repassar as informações do incident
  }

  async function loadIncidents() {
    if (loading) { //se já estiver carregando uma vez para não tentar de novo
      return;
    }

    if (total > 0 && incidents.length === total) { //verificar se já carregou todos os incidentes da página
      return;
    }

    setLoading(true); //para começar a carregar

    const response = await api.get('incidents', {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]); //pegando os incidentes de dentro da api e jogando para o estado
    setTotal(response.headers['x-total-count']);//pegando a quantidade de incidentes cadastrados e mostrando na tela
    setPage(page + 1); //para passar a página
    setLoading(false); //para parar de carregar
  }

  useEffect(() => {//função para listar os casos na tela assim que abrir a página
    loadIncidents();
  }, []) 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
    
      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)} //para não dar erro. Retornar qual a informação unica de cada item
        showsVerticalScrollIndicator= {false} //para não aparecer a barra do scroll
        onEndReached={loadIncidents} //para carregar mais incidentes depois que chegar no final da lista
        onEndReachedThreshold={0.2}//para quando o usuário estiver 10% do final da lista carregar novos incidentes
        renderItem={({ item: incident }) => ( //item é o próprio incidente, estou trocando o nome da varíavel item por incidente
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
          
            <Text style={styles.incidentProperty}>CASO</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { //para formatar o campo de valor em R$
                style: 'currency', 
                currency: 'BRL' 
              }).format(incident.value)}
            </Text>
          
            <TouchableOpacity //para transformar em um botão clicável
              style={styles.detailsButton} 
              onPress={() => navigateToDetail(incident)}//chamando a função para navegar para outra página e mostrar os detalhes do incident
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"></Feather>
            </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}