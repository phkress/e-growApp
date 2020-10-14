/* eslint-disable prettier/prettier */
import React, { createContext, useState } from 'react';
import {BleManager, Device} from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import { set } from 'react-native-reanimated';


const service = 'ab0828b1-198e-4351-b779-901fa0e0371e';

const wifiStatus = '404bc2f6-5e97-4f4d-84b9-6ae972c2bb14';
const statushome = '17f39d50-83b2-4c1f-a897-11c11ede5d16';
const wifi = '3806963c-3c14-46b9-ae5e-48ed92bbb6ae';
const rele = 'b050fa09-b1ef-47cb-a271-b679d5191c0e';  
const timer = '1749940d-c49e-4d1e-9600-90a731f01590';
const solo = 'da794645-63f1-4d7e-911e-2feaf6655098';
const porta = '68639007-1d88-435c-b2ad-d73d7e2c5310';
const temp = '158d4eea-f146-4f6f-9093-562833aa84e4';

export const EgrowBLEContext = createContext({});

const EgrowBLEProvider = ({children}) => {
  const manager = new BleManager();
  let isConnectedBLE = false;

  const [homeGreen, setHomeGreen] = useState();

    async function getWifiList(){
      try {
        const lista = []
        const resp = await homeGreen.readCharacteristicForService(service, wifi);
        let base = base64.decode(resp.value);
        let value = base.split(',');
        for (let index = 0; index < value.length; index++) {
          lista.push({
            key:String(index),
            name:value[index]
          });
        }
        return lista;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    async function getWifiStatus(){
      try {
        const resp = await homeGreen.readCharacteristicForService(service, wifiStatus);
        let base = base64.decode(resp.value);
        return base;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    async function setWifiPassword(name, password){
      const value = name+','+password;
      const base = base64.encode(value);
      try {
        await homeGreen.writeCharacteristicWithResponseForService(service, wifi,base);
        return await getWifiStatus();
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    async function getTimer(){
      try {
        const resp = await homeGreen.readCharacteristicForService(service, timer);
        let base = base64.decode(resp.value);
        let value = base.split(',');
        const clock = {
          ligar:value[0],
          desligar:value[1]
        }
        return clock;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    async function setTimer(clock){
      const {ligar, desligar} = clock;
      const value = ligar+','+desligar;
      const base = base64.encode(value);
      try {
        await homeGreen.writeCharacteristicWithResponseForService(service, timer,base);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    async function getSolo(){
      try {
        const resp = await homeGreen.readCharacteristicForService(service, solo);
        const base = base64.decode(resp.value);
        let value = base.split(',');
        const soloFormat = {
          atual:value[0],
          ideal:value[1]
        }
        console.log(soloFormat)
        return soloFormat;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    async function setSolo(value){
      value = String(value)
      const base = base64.encode(value);
      try {
        await homeGreen.writeCharacteristicWithoutResponseForService(service, solo, base);
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    async function getTempUmidade(){
      try {
        const resp = await homeGreen.readCharacteristicForService(service, temp);
        let base = base64.decode(resp.value);
        let value = base.split(',');
        const temperaturaUmidade = {
          temperatura:value[0],
          umidade:value[1]
        }
        return temperaturaUmidade;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    async function getStatusMenu(){
      try {
        const resp = await homeGreen.readCharacteristicForService(service, statushome);
        let base = base64.decode(resp.value);
        let value = base.split(',');
        
        const status = {
          solo:value[0],
          luz:value[1],
          temperatura:value[2],
          umidade:value[3],
          porta:value[4],
          wifi:value[5],
        }
        return status;
      } catch (error) {
        return []
      }
    }

    async function connectBLE(){
      await manager.startDeviceScan(null, null, async (error, device) => {
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
            console.log('Conectado a:', device.name);
            isConnectedBLE = true;
          }
          catch (e) {
            console.log('Erro Connect',e);
          }
          
        }
      });
    }
    function checkBLE(){
      return isConnectedBLE;
    }
  return (
      <EgrowBLEContext.Provider value={{
        checkBLE,
        connectBLE,
        getWifiList,
        getWifiStatus,
        getTimer,
        getSolo,
        getTempUmidade,
        getStatusMenu,

        setSolo,
        setWifiPassword,
        setTimer,
      }}>
          {children}
      </EgrowBLEContext.Provider>
  );
};

export default EgrowBLEProvider;

// function connectBLE(){
//   manager.startDeviceScan(null, null, async (error, device) => {
//     if (error) {
//       console.log('Error - Start Device Scan');
//       return;
//     }
//     if (device.name === 'HomeGreen' || device.name === 'Home Green') {
//       manager.stopDeviceScan();
//       try {
//         let dev = await device.connect();
//         await dev.discoverAllServicesAndCharacteristics();
//         setHomeGreen(device);
//         console.log('Conectado a:', device.name);
        
//       }
//       catch (e) {
//         console.log('Erro Connect',e);
//       }

//     }
//   });
// }