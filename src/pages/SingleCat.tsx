import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CatDetails, Breed } from '../types';



const SingleCatContainer = styled.div`
  display: flex;
  flex-direction: column;
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
      <SingleCatContainer>
        <Button variant="primary" size="lg" onClick={() => {returnHome()}}>
            Back
        </Button>
        <img src={url}></img>
        <p>{name}</p>
        <p>{origin}</p>
        <p>{temperament}</p>
        <p>{description}</p>
      </SingleCatContainer> 
    )
  }

  return <></>

  
}

export default SingleCat