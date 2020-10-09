/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { Surface, Text, Button, useTheme } from 'react-native-paper';

// import { Container } from './styles';


const Humidade = () => {
const {colors} = useTheme();
const icon = require('../../../assets/lampadas.png');
const styles = StyleSheet.create({
    paper: {
      flex:1,
      padding: 8,
      elevation: 4,
    },
    button:{
        width: 100,
        margin:24,
        alignSelf: 'center'
    },
    text:{
      flex:1,
      padding: 36,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    textStatus:{
      marginTop:32,
      fontSize: 24
    },
    img:{
      width: 80,
      height:80,
      marginTop:36,
      alignSelf:'center',
    },
    footer: {
      flexDirection: 'row',
      alignSelf:'center',
    }
});
  return (
  <Surface style={styles.paper}>
    <Image style={styles.img} source={icon}/>
    <View style={styles.text}>
       <Text style={styles.textStatus}>Ideal:</Text>
     </View>
     <View style={styles.footer}>
     <Button
          style={styles.button}
          mode="contained"
      >
      <Text style={{color:colors.white}}>Alterar</Text>
       </Button>
       <Button
          style={styles.button}
          mode="contained"
      >
      <Text style={{color:colors.white}}>Alterar</Text>
       </Button>
       <Button
          style={styles.button}
          mode="contained"
      >
      <Text style={{color:colors.white}}>Alterar</Text>
       </Button>
       <Button
          style={styles.button}
          mode="contained"
      >
      <Text style={{color:colors.white}}>Alterar</Text>
       </Button>
     </View>
  </Surface>
  );
}
export default Humidade;