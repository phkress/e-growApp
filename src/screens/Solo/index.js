/* eslint-disable prettier/prettier */
import React from 'react';

import Marcador from '../../components/MarcadorComSlider'



const Solo = () => {

  const data = {
    atual:27,
    max:100,
    min:0,
    ideal:20,
    tipo:'',
    imagem:'solo'
  }
  
  return (
      <Marcador 
        data={data}
      />
    );  
}
export default Solo;