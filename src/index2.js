/* eslint-disable prettier/prettier */
import React, { useState }  from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import base64 from 'react-native-base64';

const App = () => {
  const manager = new BleManager();

  // let homeGreen;
  const service = 'ab0828b1-198e-4351-b779-901fa0e0371e';
  const wifi = '4ac8a682-9736-4e5d-932b-e9b31405049c';
  const rele = '4ac8a682-9736-4e5d-932b-e9b31405049d';  
  const relogio = '4ac8a682-9736-4e5d-932b-e9b31405049e';
  const porta = '4ac8a682-9736-4e5d-932b-e9b31405049f';

  // let luz = {inicial:null, final:null};
  const [luz, setLuz] = useState({inicial:null, final:null});
  const [homeGreen, setHomeGreen] = useState();
  const [door, setDor] = useState();

  
  async function getCharacteisticsDoor(){
    try {
      const resp = await homeGreen.readCharacteristicForService(service, porta);
      let base = base64.decode(resp.value);
      let value = base.split(',');
      console.log(base)
    } catch (e) {
      console.error(e);
    }
  }
  async function getCharacteisticsRele(){
    try {
      const resp = await homeGreen.readCharacteristicForService(service, relogio);
      let base = base64.decode(resp.value);
      let value = base.split(',');
      setLuz({inicial:value[0], final:value[1]});
    } catch (e) {
      console.error(e);
    }
  }
  async function disconectBLE(){
    try {
      await homeGreen.cancelConnection();
    } catch (e) {
      console.error(e);
    }
  }
  function connectBLE(){
   manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log('Error - Start Device Scan');
        return;
      }
      if (device.name === 'HomeGreen' || device.name === 'Home Green') {
        manager.stopDeviceScan();
        try {
          let dev = await device.connect();
          await dev.discoverAllServicesAndCharacteristics();
          setHomeGreen(device);
        }
        catch (e) {
          console.log(e);
        }
      }
    });
  }

  return (
    <View style = {styles.conteiner}>
      <View style = {styles.header}>
        <Text
          onPress={() => {
            console.log('Disconnect!');
            disconectBLE();
          }}
        >Disconect</Text>
        <Text
          onPress={() => {
            console.log('Connect!');
            connectBLE();
          }}
        >Connect!</Text>
      </View>
      <View style = {styles.main}>
        <Text style = {styles.title}>HomeGreen</Text>
        <Text>Feito pra você!</Text>
      </View>
      <View style={ styles.body}>
        <TouchableOpacity
          style = {styles.box}
          onPress={() => {
            getCharacteisticsRele();
            getCharacteisticsDoor();
          }}
        >
          <Text>Luz</Text>
          <View  style={styles.boxInside}>
            <Text>Inicial: {luz.inicial}</Text>
            <Text>Final: {luz.final} </Text>
          </View>
        </TouchableOpacity>
        <View style={ styles.box}>
          <Text>Porta</Text>
        </View>
        <View style={ styles.box}>
          <Text>Termostato</Text>
          <View  style={styles.boxInside}>
            <Text>Temperatura: </Text>
            <Text>Humidade: </Text>
          </View>
        </View>
        <View style={ styles.box}>
          <Text>WiFi</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxInside:{
    flex:1,
  },
  main:{
    height: 200,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  body:{
    flex:1,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    color: 'green',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },
  header:{
    height:60,
    backgroundColor: '#FFf',
    paddingHorizontal: 20,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth :1,
    borderBottomColor: '#CCC',
  },
  conteiner:{
    flex: 1, //
    backgroundColor: '#CCC',
    // flexDirection: 'row', //direção dos elementos filhos
    // alignItems: 'center', //fluxo do conteiner e horizonatal sempre alinha no eixo contrario do flexDirection
    // justifyContent: 'flex-start', //Alinha de acordo com o mesmo eixos do flexDirection
    // flexWrap: 'wrap', //Desliga a função do alingItems
    // alignContent: 'space-between' //Alinhamento entre linhas

  },
  box:{
    // flex:1, //flexivel, vai fleionar para cabr sempre no conteiner pai
    backgroundColor: '#FFF',
    height: '46%',
    width: '46%',
    margin: '2%',
    padding:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default App;
