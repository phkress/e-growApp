/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { Surface, Text, Button, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
// import { Container } from './styles';


const Marcador = (props) => {
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
          alignItems: 'center',
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
        },
        wrap:{},
        slider: {},
    });

const {colors} = useTheme();
const [item, setItem] = useState(props.data)
const iluminacao = require('../../../assets/lampadas.png')
const temperatura = require('../../../assets/temperatura.png')
const humidade = require('../../../assets/humidade.png')
const solo = require('../../../assets/solo.png')
const porta = require('../../../assets/door.png')
const wifi = require('../../../assets/wifi.png')



const handlerSlideValue = (value) =>{
    setItem({...item, ideal : value})
}

const renderImage = () =>{
  console.log(item)
  switch (props.data.imagem) {
    case 'iluminacao':
        return <Image style={styles.img} source={iluminacao}/>
    case 'temperatura':
      return <Image style={styles.img} source={temperatura}/>  
    case 'humidade':
      return <Image style={styles.img} source={humidade}/>  
    case 'solo':
      return <Image style={styles.img} source={solo}/>  
    case 'porta':
      return <Image style={styles.img} source={porta}/>  
    case 'wifi':
      return <Image style={styles.img} source={wifi}/>  
  }
}
return (
  <Surface style={styles.paper}>
    {renderImage()}
    <View style={styles.text}>
       <Text style={styles.textStatus}>Atual: {item.atual}{item.tipo}</Text>
       <Text style={styles.textStatus}>Ideal: {item.ideal}{item.tipo}</Text>
     </View>
     <View style={styles.wrap}>
         <Slider
          style={styles.slider}
          minimumValue={4}
          maximumValue={32}
          value={item.ideal}
          thumbTintColor={colors.primary}
          maximumTrackTintColor="#000000"
          step={1}
          onValueChange={handlerSlideValue}
         />
     </View>
      <View style={styles.footer}>
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

export default Marcador;