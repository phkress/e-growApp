/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, StyleSheet,  } from 'react-native';
import {List, Button, useTheme, Text, TextInput } from 'react-native-paper';
import { EgrowBLEContext} from '../../context/EgrowBLEContext'

// import { Container } from './styles';

const Wifi = ({ navigation }) => {
  const {getWifiList, setWifiPassword } = useContext(EgrowBLEContext);
  const [listWifi, setListWifi] = useState([]);
  const [visible, setVisible] = useState(false);
  const [password, setPasword] = useState('');
  const [wifiName, setWifiName] = useState('');
  const {colors} = useTheme();

  useEffect(()=>{
    setVisible(false);
    getWifiListBLE();
  },[])

  const showForm = () => setVisible(true);

  const hideForm = () => setVisible(false);

  async function getWifiListBLE(){
    try {
      const list = await getWifiList();

      setListWifi(list)
    } catch (error) {
      console.log(error)
    }
  }
  function handlerWifi(name){
    showForm() 
    setWifiName(name)
  }
  async function handleConectar(){
    try{
     const resp = await setWifiPassword(wifiName,password)
     if(resp === 'true'){
      navigation.navigate('Home');
     }
    }catch(err){
      console.log(err)
    }
  }

  const styles = StyleSheet.create({
    loading:{marginTop:250},
    listItem:{
      backgroundColor: colors.listBg,
      borderColor: colors.listBorder,
      borderStyle: 'solid',
      borderWidth:0.2
      //titleStyle:{{color:'blue'}},
    },
    textLabel:{      
      fontSize: 20,
      color:colors.primary,
      marginVertical:24
    },
    textButton:{
      color:colors.white,
      paddingVertical:8
    },
    textWfi:{
      marginHorizontal:24,
      fontSize:16,
    },
    buttonBox:{
      borderRadius: 15,
      marginVertical:24
    },
    buttonView:{
      marginTop:60
    }
  })
  
  return (
    <View >{ visible ?
    <View style={styles.textWfi}>
      <Text style={styles.textLabel}>Nome da rede:</Text>
      <Text style={{paddingLeft:16}}>{wifiName}</Text>
      <Text style={styles.textLabel}>Por favor coloque a senha da rede:</Text>
      <TextInput
        label="Senha da rede"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPasword(text)}
      />
      <View style={styles.buttonView}>
        <Button mode="contained" style={styles.buttonBox} labelStyle={styles.textButton} onPress={()=>handleConectar()}> Conectar</Button>
        <Button  mode="contained" color="red" style={styles.buttonBox} labelStyle={styles.textButton} onPress={hideForm}> Cancelar</Button>
      </View>
    </View>
    : 
    <View >
      {listWifi.length <= 0 ?
       <Button style={styles.loading} loading='true' >loading...</Button >  :
      <FlatList
        data={listWifi}
        renderItem={({item}) =>
          <List.Item
            style={styles.listItem}
            key={item.key}
            title={item.name}
            onPress={()=>{handlerWifi(item.name)}}
            left={props => <List.Icon {...props} icon="wifi" />}
          />
        }
      /> }
  </View>}
  </View>
  );
}

export default Wifi;