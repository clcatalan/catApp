import { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';



const SingleCat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [catData, setCatData] = useState({});


  useEffect(() => {
    console.log('location', location)
    const { state } = location;
    setCatData(state);
  }, [location]);

  const returnHome = () => {
    console.log('catData', catData)
    navigate('/', { state: { breed_id: catData.selectedBreed } });
  }

  return (
    <Button variant="primary" size="lg" onClick={() => {returnHome()}}>
        Back
    </Button>
    
  )
}

export default SingleCat