import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { CardType } from '../types';


const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;

const Card = ({
  imgUrl,
  id,
  selectedBreed,
  alt,
}: CardType) => {

  const navigate = useNavigate();

  const viewDetails = (id: string) => {
    fetch(`https://api.thecatapi.com/v1/images/${id}`, {
        mode:  'cors', 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        
        navigate('/single-cat', { state: { selectedBreed, catData: data } });
      })
      .catch(error => console.error(error));
  }

  return (
    <CardContainer>
        <img src={imgUrl} alt={alt} width="200" height="200"></img>
        <Button variant="primary" size="lg" onClick={() => {viewDetails(id)}}>
            View Details
        </Button>
    </CardContainer>
  )
}

export default Card