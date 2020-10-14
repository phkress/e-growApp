/* eslint-disable prettier/prettier */
import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { Surface, Text, Button, useTheme } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { EgrowBLEContext } from '../../context/EgrowBLEContext'

// import { Container } from './styles';


const Porta = () => {
const {colors} = useTheme();
const icon = require('../../../assets/door.png');
const {} = useContext(EgrowBLEContext);
useEffect(()=>{
},[])

const styles = StyleSheet.create({
    paper: {
      flex:1,
      padding: 8,
      elevation: 4,
    },
    button:{
        alignSelf: 'center',
    },
    text:{
      flex:1,
      padding: 36,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    img:{
      width: 80,
      height:80,
      marginTop:36,
      alignSelf:'center',
    },
});
  return (
  <Surface style={styles.paper}>
    <Image style={styles.img} source={icon}/>
    
    <View style={styles.text}>
      <Button 
        style={styles.button}
        mode="contained"
        onPress={()=>console.log('apertou!')}
      >
        <Text
          style={{color:'white'}}
        >Trancar !</Text>
      </Button>
    </View>
  </Surface>
  );
}
export default Porta;