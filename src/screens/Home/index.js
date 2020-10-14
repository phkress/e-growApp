/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import { useTheme, Button } from 'react-native-paper';
import {  Text, TouchableOpacity ,  View,  StyleSheet, Image, FlatList } from 'react-native';
import { EgrowBLEContext } from '../../context/EgrowBLEContext'

const Home = ({ navigation }) => {

  const { checkBLE, getStatusMenu ,connectBLE } = useContext(EgrowBLEContext);
  const {colors} = useTheme();
  const [ lista, setLista ] = useState([
    {key:'0', name:'Iluminacao', titulo:'Iluminação',status:'',type:'', img: require('../../../assets/lampadas.png')},
    {key:'1', name:'Home', titulo:'Temperatura',status:'',type:' ºC', img:  require('../../../assets/temperatura.png')},
    {key:'2', name:'Home', titulo:'Humidade',status:'',type:' %', img: require('../../../assets/humidade.png')},
    {key:'3', name:'Solo', titulo:'Solo',status:' ',type:'', img: require('../../../assets/solo.png')},
    {key:'4', name:'Porta', titulo:'Porta',status:'',type:'', img: require('../../../assets/door.png')},
    {key:'5', name:'Wifi', titulo:'Wi-fi',status:'',type:'', img: require('../../../assets/wifi.png')},
  ])
  const [ isLinked, setIsLinked ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const styles = StyleSheet.create({
    paper: {
      width: '100%',
      height:100,
      paddingHorizontal:8 ,
      paddingVertical:4,
      elevation: 4,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: colors.listBg,
    },
    conteiner:{
      flex:1,
      backgroundColor: colors.listBg,
    },
    body:{
      flex:1,
      backgroundColor: colors.listBg,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    textBox:{
      marginTop:8,
      marginLeft:16,
    },
    textTitulo:{
      fontSize: 24,
      fontWeight:'bold',
    },
    textStatus:{
      marginTop: 8,
      fontSize: 18,
    },
    imgBox:{
      padding: 10,
    },
    box:{
      flex:1, //flexivel, vai fleionar para cabr sempre no conteiner pai
    },
  });

  useEffect(()=>{ 
    connectBLE();
    setInterval(() => {
      verify();
    }, 3000);
  },[])

  useEffect(()=>{
    if(isLinked){
      loadList()
    }
  },[isLinked])

  function verify(){
    const value =  checkBLE();
    setIsLinked(value)
    return value;
  }
  async function loadList(){
    const newList = await getStatusBLE();
    setLista(newList);
    setIsLoading(true);
    
    setTimeout(() => {
      loadList();
    }, 5000);
  }
  async function getStatusBLE(){
    let list = lista;
    const {solo, luz, temperatura, umidade, porta, wifi} =  await getStatusMenu();
    list[0].status = String(luz); // MUDAR
    list[1].status = String(temperatura);
    list[2].status = String(umidade);
    list[3].status = String(solo);
    list[4].status = String(porta); // MUDAR
    list[5].status = String(wifi);
    return list
  }
  

  return (
    <View style={styles.container}>
      {isLoading ?
        <FlatList
        data={lista}
        renderItem={({item}) =>
        <TouchableOpacity
        key={item.key}
        style = {styles.paper}
        onPress={() => navigation.navigate(item.name)}
        >
          <View style={styles.imgBox} >
            <Image source={item.img}/>
          </View>
          <View style={styles.textBox} >
            <Text style={styles.textTitulo} >{item.titulo}</Text>
            <Text style={styles.textStatus}>Status: {item.status}{item.type}</Text>
          </View>
        </TouchableOpacity>
        }/>
      :
      <Button style={{marginTop:250}} loading='true' >loading...</Button >
      
    }
      </View>
  );
};


export default Home;


  // async function getStatus(){
  //   let list = lista;
  //   let wifiFormatado;

  //   const {ideal, atual} = await getSolo();
  //   const { temperatura, umidade } = await getTempUmidade();
  //   const statusWifi = await getWifiStatus()

  //   statusWifi ?  wifiFormatado = "Conectado" : wifiFormatado = "Desconectado";
    
  //   list[0].status = 'LIGADA'; // MUDAR
  //   list[1].status = String(temperatura);
  //   list[2].status = String(umidade);
  //   list[3].status = String(atual);
  //   list[4].status = 'ABERTO'; // MUDAR
  //   list[5].status = String(wifiFormatado);
    
  //   setLista(list);
  //   console.log('status')
  //   return lista;
  // }