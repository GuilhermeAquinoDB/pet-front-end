import { Button } from '@mui/material';
import { Pet } from '../../../data/@types/Pet';
import {ListStyled, ItemList, Photo, Information, Name, Description } from './List.style';
import { TextService } from '../../../data/services/TextService';

interface ListProps {
  pets: Pet[];
  onSelect: (pet: Pet) => void;
}

export default function List(props: ListProps) {
  const tamanhoMaximoTexto = 200;

  return (
    <ListStyled>
      {props.pets.map(pet => (
          <ItemList key={pet.id} >
            <Photo src={pet.foto} alt={pet.nome} />
            <Information>
                <Name>{pet.nome}</Name>
                <Description>
                    {TextService.limitarTexto(pet.historia, tamanhoMaximoTexto)}
                  </Description>
                <Button 
                    variant={'contained'} 
                    fullWidth 
                    onClick={() => props.onSelect(pet)}
                >
                    Adotar {pet.nome}
                </Button>
            </Information>
          </ItemList>
      ))}
    </ListStyled>
  )
}