import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {Button, Container} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CatDetails, Breed } from '../types';



const SingleCatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
`;

const DetailsContainer = styled.div`
  width: 800px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;

`;

const SingleCat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [catDetails, setCatDetails] = useState<CatDetails>({} as CatDetails);


  useEffect(() => {
    console.log('location', location)
    const { state } = location;
    console.log('state', state)
    setCatDetails(state);

  }, [location]);

  const returnHome = () => {
    console.log('catDetails', catDetails)
    navigate('/', { state: { breed_id: catDetails.selectedBreed } });
  }

  if(catDetails.catData) {
    const { catData: { url, breeds }, selectedBreed } = catDetails;

    const breed: Breed = breeds.find(b => b.id === selectedBreed) || {} as Breed;

    const { description, name, origin, temperament } = breed;

    return (
      <StyledContainer>
        <SingleCatContainer>
          <img src={url} width="800" height="600"></img>
          <DetailsContainer>
            <h1>{name}</h1>
            <h2>Origin: {origin}</h2>
            <h4>{temperament}</h4>
            <span>{description}</span>
          </DetailsContainer>
          <Button variant="primary" size="lg" onClick={() => {returnHome()}}>
              Back
          </Button>  
        </SingleCatContainer> 
      </StyledContainer>
      
    )
  }

  return <></>

  
}

export default SingleCat