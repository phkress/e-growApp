/* eslint-disable prettier/prettier */
import React, {useContext, useState, useEffect} from 'react';
import { Button } from 'react-native-paper';
import Marcador from '../../components/MarcadorComSlider'
import { EgrowBLEContext} from '../../context/EgrowBLEContext'


const Solo = () => {

  const { getSolo } = useContext(EgrowBLEContext);
  const [atual, setAtual] = useState(0);
  const [ideal, setIdeal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    loadSolo()
  },[])

  async function loadSolo(){
    const {ideal, atual} = await getSolo();
    
    setIdeal(Number(ideal));
    setAtual(Number(atual));
    setIsLoading(true);
  }

  const data = {
    max:100,
    min:0,
    tipo:'',
    imagem:'solo',
    step:1
  }
  
  return (
    <>
      {isLoading ? 
      <Marcador 
        data={data}
        atual={atual}
        ideal={ideal}
      />
      :
      <Button style={{marginTop:250}} loading='true' >loading...</Button >
    }
    </>
    );  
}
export default Solo;