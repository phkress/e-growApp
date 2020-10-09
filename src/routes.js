/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './screens/Home';
import Iluminacao from './screens/Iluminacao';
import Humidade from './screens/Humidade';
import Temperatura from './screens/Temperatura';
import Wifi from './screens/Wifi';
import Bluetooth from './screens/Bluetooth';
import Solo from './screens/Solo';
import Porta from './screens/Porta';


const Routes = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Dashbord'}}/>
        <Stack.Screen name="Iluminacao" component={Iluminacao} />
        <Stack.Screen name="Temperatura" component={Temperatura} />
        <Stack.Screen name="Humidade" component={Humidade} />
        <Stack.Screen name="Wifi" component={Wifi} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="Solo" component={Solo} />
        <Stack.Screen name="Porta" component={Porta} />
    </Stack.Navigator>

    );
  };
  
  export default Routes;