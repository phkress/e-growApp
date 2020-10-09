/* eslint-disable prettier/prettier */
import React from 'react';
import { useTheme } from 'react-native-paper';
import {  Text, TouchableOpacity ,  View,  StyleSheet, Image, FlatList } from 'react-native';

const Home = ({ navigation }) => {
  const {colors} = useTheme();
  const lista =
    [
      {key:'1', name:'Iluminacao', titulo:'Iluminação',status:'Ativo', img: require('../../../assets/lampadas.png')},
      {key:'2', name:'Temperatura', titulo:'Temperatura',status:'27 ºC', img:  require('../../../assets/lampadas.png')},
      {key:'3', name:'Humidade', titulo:'Humidade',status:'75 %', img: require('../../../assets/lampadas.png')},
      {key:'4', name:'Solo', titulo:'Solo',status:' 80', img: require('../../../assets/lampadas.png')},
      {key:'5', name:'Porta', titulo:'Porta',status:'Aberta', img: require('../../../assets/lampadas.png')},
      {key:'6', name:'Wifi', titulo:'Wi-fi',status:'Bom', img: require('../../../assets/lampadas.png')},
    ]

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

  return (
    <View style={styles.container}>
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
          <Text style={styles.textStatus}>Status: {item.status}</Text>
        </View>
      </TouchableOpacity>
      }/>
      </View>
  );
};


export default Home;
/* <FlatList
      data={[{key: 'a'},{key: 'b'},{key: 'c'}]}
      style={{backgroundColor:colors.listBg}}
      renderItem={({item}) =>
        <List.Item 
           key={item.key}
           title="Informações Gerais:"
           description="Ultimas informação recolida dos sensores"
         left={props => <List.Icon {...props} icon="folder" />}
         />
      
      }
    /> */
    // <View style={{flex:1, justifyContent:'flex-start', alignItems:"flex-start"}}>
      //     <Text style={
      //         colors.accent
      //     }>
      //         Teste
      //     </Text>
      //     <Button icon="camera" mode="contained" onPress={hendlerBotao} style={{flex:1, justifyContent:'center', alignItems:"center"}}>Teste</Button>
      // </View>