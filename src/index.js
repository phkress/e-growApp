/* eslint-disable prettier/prettier */
import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar} from 'react-native'
import Routes from './routes'
import HeaderBar from './components/HeaderBar'
import EgrowBLEProvider from './context/EgrowBLEContext'

const theme = {
    ...DefaultTheme,
    roundness:22,
    colors:{
        ...DefaultTheme.colors,
        backGroud: '#D5CEE0',
        primary: '#32C575',
        contrastText: '#fff',
        white: '#FFF',
        listBg: '#FFF',
        listBorder: '#E5E5EA'
    }
}
const App = () => {
  return (
    
      <PaperProvider theme={theme}>
          <NavigationContainer>
          <EgrowBLEProvider>
              <StatusBar barStyle="light-content"/>
              <HeaderBar/>
              <Routes/>
          </EgrowBLEProvider>
          </NavigationContainer>
      </PaperProvider>
  );
};


export default App;
