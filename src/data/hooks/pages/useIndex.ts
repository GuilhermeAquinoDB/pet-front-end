import { useState, useEffect } from "react";
import { Pet } from '../../@types/Pet';
import { ApiService } from '../../services/ApiService';
import { AxiosError } from "axios";

export function useIndex() {
  const [listPets, setListPets] = useState<Pet[]>([]),
    [petSelected, setPetSelected] = useState<Pet | null>(null),
    [email, setEmail] = useState(''),
    [valor, setValor] = useState(''),
    [message, setMessage] = useState('');

  useEffect(() => {
    ApiService.get('/pets').then((resposta) => {
      setListPets(resposta.data);
    })
  }, [])

  useEffect(() => {
    if(petSelected === null) {
      cleanForm();
    }
  }, [petSelected])

  function toAdpt() {
    if(petSelected !== null) {
        if(validatorDataAdoption()) {
            ApiService.post('/adocoes', {
              pet_id: petSelected.id,
              email,
              valor
            })
              .then(() => {
                  setPetSelected(null);
                  setMessage('Pet adotado com sucesso!');
              })
              .catch((error: AxiosError | any) => {
                  setMessage(error.response?.data.message);
              })
        } else {
          setMessage('Preencha todos os campos corretamente!');
        }
    }
  }

  function validatorDataAdoption(){
    return email.length > 0 && valor.length > 0;
  }

  function cleanForm() {
      setEmail('');
      setValor('');
  }

  return {
    listPets,
    petSelected,
    setPetSelected,
    email,
    setEmail,
    valor,
    setValor,
    message,
    setMessage,
    toAdpt
  };
}