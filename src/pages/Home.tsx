import { useState, useEffect, useMemo } from 'react';
import { Button, Container, Dropdown } from 'react-bootstrap';
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
  width: 100%;
  flex-wrap: wrap;
`;

const PAGE_LIMIT = 10;

const Home = () => {

  const pageLimit = useMemo(() => 10, [PAGE_LIMIT]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentSelectedBreed, setCurrentSelectedBreed] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if(location.state) {
      
      const { state } = location;

      getPhotos(state.breed_id)
    }
  }, [location]);

  const getPhotos = (eventKey: string) => {

    const newPage = currentPage + 1;

    fetch(`https://api.thecatapi.com/v1/images/search?page=${newPage}&limit=${pageLimit}&breed_id=${eventKey}`, {
        mode:  'cors', 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        let combinedData = [...data];
        if(currentSelectedBreed === eventKey) {
          combinedData = [...photos, ...combinedData];
        }
        setCurrentSelectedBreed(eventKey);
        setPhotos(combinedData);
        setCurrentPage(newPage);


        if(data.length < pageLimit) {
          //if data returned is less than the page limit, then there is no more data to return
          setLoadMoreVisible(false);
        } else {
          // if data returned is at least equal to the page limit, then there is a possibility of more data to load
          setLoadMoreVisible(true);
        }
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
              <Card imgUrl={p.url} id={p.id} selectedBreed={currentSelectedBreed}></Card>
            )
          }
      </PhotosContainer>
      {loadMoreVisible && <Button onClick={()=> getPhotos(currentSelectedBreed)}>Load More</Button>}
    </StyledContainer>
    
  )
}

export default Home