/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import {View, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { Surface, Text, Button, useTheme, Modal, Portal, Provider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { EgrowBLEContext} from '../../context/EgrowBLEContext'
// import { Container } from './styles';


const Iluminacao = () => {
const { getTimer, setTimer } = useContext(EgrowBLEContext);
const {colors} = useTheme();
const icon = require('../../../assets/lampadas.png');
const [horaLigar,setHoraLigar] = useState();
const [minuteLigar,setMinuteLigar] = useState();
const [horaDesligar,setHoraDesligar] = useState();
const [minuteDesligar,setMinuteDesligar] = useState('');
const [edit,setEdit] = useState(false);

const [hora, setHora] = useState([{
  value: '00',
  label: '00'
}]);
const [minute, setMinute] = useState([{
  value: '00',
  label: '00'
}]);

useEffect(()=>{
  makeHora();
  makeMinute();
  loadingTimer();
},[])


function makeHora(){
  let  h = []
  for (let index = 1; index < 25; index++) {
    if(index<10){
      index = '0'+index
    }
    let valor ={
      value: String(index),
      label: String(index)
    }
    h.push(valor)
  }
  
  setHora(h)
}
function makeMinute(){
  let  m = []
  for (let index = 0; index < 60; index++) {
    if(index<10){
      index = '0'+index
    }
    let valor ={
      value: String(index),
      label: String(index)
    }
    m.push(valor)
  }
  setMinute(m)
}
async function loadingTimer(){
  const {ligar, desligar} = await getTimer();
  let horaL = ligar.substring(0,2);
  let minuteL = ligar.substring(2,4);
  let horaD = desligar.substring(0,2);
  let minuteD = desligar.substring(2,4);

  setHoraLigar(horaL);
  setHoraDesligar(horaD);
  setMinuteLigar(minuteL);
  setMinuteDesligar(minuteD);
}
function handlesHoraLigar(value){
  setHoraLigar(value)
}
function handlesMinuteLigar(value){
  setMinuteLigar(value)
}

function handlesHoraDesligar(value){
  setHoraDesligar(value)
}
function handlesMinuteDesligar(value){
  setMinuteDesligar(value)
}
function handleSave(){
  setEdit(false);
  const clock ={
    ligar:`${horaLigar}${minuteLigar}`,
    desligar:`${horaDesligar}${minuteDesligar}`,
  }
  setTimer(clock);
}
const styles = StyleSheet.create({
    paper: {
      flex:1,
      padding: 8,
      elevation: 4,
    },
    button:{
        width: 100,
        margin:24,
        alignSelf: 'center',
    },
    text:{
      flex:1,
    },
    textStatus:{
      fontSize: 24,
      marginBottom:8,
    },
    img:{
      width: 80,
      height:80,
      marginTop:16,
      marginBottom:24,
      alignSelf:'center',
    },
    footer: {
      flexDirection: 'row',
      alignSelf:'center',
    },
    row:{
      width:'100%',   
    },
    select:{
    },
    textClock:{
      fontSize: 16,
      color:colors.primary
    },
    container: {
      flex: 1,
      width:'100%',
    },
});

return (
  <Surface style={styles.paper}>
    <Image style={styles.img} source={icon}/>
    <View style={styles.text}>
      <ScrollView style={styles.container}>
       <Text style={styles.textStatus}>Ligar as: {horaLigar}: {minuteLigar}</Text>
       {edit ? <View>
       <Text style={styles.textClock}>
          Hora:
        </Text>
        <RNPickerSelect        
          placeholder={{
              label: 'Selecione a hora de Ligar',
              value: null,
          }}
          style={pickerStyle}
          value={horaLigar}
          onValueChange={(value) => {handlesHoraLigar(value)}}
          items={hora}
        />
        <RNPickerSelect
          placeholder={{
              label: 'Selecione a hora de Ligar',
              value: null,
          }}
          style={pickerStyle}
          value={minuteLigar}
          onValueChange={(value) => {handlesMinuteLigar(value)}}
          items={minute}
        />
      </View>: <></>}
       <Text style={styles.textStatus}>Desligar as: {horaDesligar}: {minuteDesligar}</Text>
      {edit ? <View>
        <Text style={styles.textClock}>
          Hora:
        </Text>
        <RNPickerSelect
          placeholder={{
              label: 'Selecione a hora de Desligar',
              value: null,
          }}
          style={pickerStyle}
          value={horaDesligar}
          onValueChange={(value) => {handlesHoraDesligar(value)}}
          items={hora}
        />
        <RNPickerSelect
          placeholder={{
              label: 'Selecione a hora de Desligar',
              value: null,
          }}
          style={pickerStyle}
          value={minuteDesligar}
          onValueChange={(value) => {handlesMinuteDesligar(value)}}
          items={minute}
        />
        </View>:<></>}
       </ScrollView>
     </View>
     <View style={styles.footer}>
       {edit ?        
       <Button
       style={styles.button}
       mode="contained"
       onPress={()=>handleSave()}
        >
        <Text style={{color:colors.white}}>Salvar</Text>
        </Button>
       :
       <Button
          style={styles.button}
          mode="contained"
          onPress={()=>setEdit(true)}
      >
      <Text style={{color:colors.white}}>Alterar</Text>
       </Button>}
     </View>
  </Surface>
  );
}
const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
	},
	inputAndroid: {
    color: 'black',
	},
	placeholderColor: 'black',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};
export default Iluminacao;
