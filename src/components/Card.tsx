import React from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Card = ({imgUrl, id, selectedBreed}) => {

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
    <div >
        <img src={imgUrl} width="200" height="200"></img>
        <Button variant="primary" size="lg" onClick={() => {viewDetails(id)}}>
            View Details
        </Button>
    </div>
  )
}

export default Card