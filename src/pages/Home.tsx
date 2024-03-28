import { useState, useEffect } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Card } from '../components';

import {cats} from '../constants/cats';
import { Photo } from '../types';


const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const PhotosContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const Home = () => {

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('');

  const location = useLocation();

  useEffect(() => {
    if(location.state) {
      
      const { state } = location;
      console.log('state home', state)

      getPhotos(state.breed_id)
    }
  }, [location]);

  const getPhotos = (eventKey: string) => {
    fetch(`https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id=${eventKey}`, {
        mode:  'cors', 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        setSelectedBreed(eventKey);
        setPhotos(data);
      })
      .catch(error => console.error(error));
  }

  return (
    <StyledContainer>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select a Cat Breed
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            cats.map(c => 
              <Dropdown.Item onClick={()=> getPhotos(c.breed_id)}>
                {c.breed_name}
              </Dropdown.Item>)
          }
        </Dropdown.Menu>
      </Dropdown>
      <PhotosContainer>
          {
            photos.map(p => 
              <Card imgUrl={p.url} id={p.id} selectedBreed={selectedBreed}></Card>
            )
          }
      </PhotosContainer>
    </StyledContainer>
    
  )
}

export default Home