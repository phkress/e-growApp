/* eslint-disable prettier/prettier */
import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar} from 'react-native'
import Routes from './routes'
import HeaderBar from './components/HeaderBar'

const theme = {
    ...DefaultTheme,
    roundness:22,
    colors:{
        ...DefaultTheme.colors,
        backGroud: '#D5CEE0',
        primary: '#32C575',
        contrastText: '#fff',
        white: '#FFF',
        listBg: '#FFF'
    }
}
const App = () => {
  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
            <StatusBar barStyle="light-content"/>
            <HeaderBar/>
            <Routes/>
        </NavigationContainer>
      </PaperProvider>
  );
};


export default App;
