import { AxiosError } from 'axios';
import { useState } from 'react';
import { ApiService } from '../../../services/ApiService';

export function useCadastro() {
  const [nome, setNome] = useState(''),
        [historia, setHistoria] = useState(''),
        [foto, setFoto] = useState(''),
        [messagem, setMessagem] = useState('');

  function register() {
      if(validatorForm()) {
          ApiService.post('/pets', {
            nome,
            historia,
            foto
          })
            .then(() => {
              clean();
              setMessagem('Pet cadastrado com sucesso!')
            })
            .catch((error: AxiosError | any) => {
              setMessagem(error.response?.data.message);
            })

      } else {
        setMessagem('Preencha todos os campos');
      }
  }

  function validatorForm() {
    return nome.length > 0 && historia.length > 20 && foto.length > 5;
  }
  
  function clean() {
    setNome('');
    setHistoria('');
    setFoto('');
  }

  return { 
    nome,
    historia,
    foto,
    messagem,
    setNome,
    setHistoria,
    setFoto,
    setMessagem,
    register
  }
};