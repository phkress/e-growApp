/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { Surface, Text, Button, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { EgrowBLEContext} from '../../context/EgrowBLEContext'
// import { Container } from './styles';


const Marcador = (props) => {
  const { setSolo } = useContext(EgrowBLEContext);
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
const item = props.data;
const [ideal, setIdeal] = useState(props.ideal)
const temperatura = require('../../../assets/temperatura.png')
const humidade = require('../../../assets/humidade.png')
const solo = require('../../../assets/solo.png')

const handlerSlideValue = (value) =>{
  setIdeal(value)
}

const handlerAlterar = () =>{
  switch (props.data.imagem){
    case 'temperatura':
      break;
    case 'humidade':
      break;
    case 'solo':
      setSolo(ideal);
      break;
  }
}

const renderImage = () =>{
  switch (props.data.imagem) {
    case 'temperatura':
      return <Image style={styles.img} source={temperatura}/>  
    case 'humidade':
      return <Image style={styles.img} source={humidade}/>  
    case 'solo':
      return <Image style={styles.img} source={solo}/>
  }
}

return (
  <Surface style={styles.paper}>
    {renderImage()}
    <View style={styles.text}>
       <Text style={styles.textStatus}>Atual: {props.atual}{item.tipo}</Text>
       <Text style={styles.textStatus}>Ideal: {ideal}{item.tipo}</Text>
     </View>
     <View style={styles.wrap}>
         <Slider
          style={styles.slider}
          minimumValue={item.min}
          maximumValue={item.max}
          value={ideal}
          thumbTintColor={colors.primary}
          maximumTrackTintColor="#000000"
          step={item.step}
          onValueChange={handlerSlideValue}
         />
     </View>
      <View style={styles.footer}>
       <Button
          style={styles.button}
          mode="contained"
          onPress={()=>{handlerAlterar()}}
      > 
      <Text style={{color:colors.white}}        
      >Alterar</Text>
       </Button>
     </View>
  </Surface>
  );
}

export default Marcador;