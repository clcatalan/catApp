import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CatDetails } from '../types';



const SingleCatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SingleCat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [catData, setCatData] = useState<CatDetails>({} as CatDetails);


  useEffect(() => {
    console.log('location', location)
    const { state } = location;
    console.log('state', state)
    setCatData(state);

  }, [location]);

  const returnHome = () => {
    console.log('catData', catData)
    navigate('/', { state: { breed_id: catData.selectedBreed } });
  }

  return (
    <SingleCatContainer>
      <Button variant="primary" size="lg" onClick={() => {returnHome()}}>
          Back
      </Button>
    </SingleCatContainer>
    
    
  )
}

export default SingleCat