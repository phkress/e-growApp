/* eslint-disable prettier/prettier */
import React from 'react';

import Marcador from '../../components/MarcadorComSlider'


const Temperatura = () => {

const data = {
  atual:27,
  max:100,
  min:0,
  ideal:20,
  tipo:'ºC',
  imagem:'temperatura'
}

return (
    <Marcador 
      data={data}
    />
  );
}
export default Temperatura;