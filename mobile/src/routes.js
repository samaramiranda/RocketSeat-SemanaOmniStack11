import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; //importando biblioteca de navegação do react native

const AppStack = createStackNavigator(); //criando primeira navegação

import Incidents from './pages/Incidents';//importando as paginas criadas
import Detail from './pages/Detail';

export default function Routes() {
  return (
    //<NavigationContainer> é obrigatório vir por volta de TODA rota
    //AppStack.Screen é obrigatório vir por volta de CADA rota da aplicação
    <NavigationContainer> 
      
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents}></AppStack.Screen> 
        <AppStack.Screen name="Detail" component={Detail}></AppStack.Screen> 
      </AppStack.Navigator>
    </NavigationContainer>
  );
}