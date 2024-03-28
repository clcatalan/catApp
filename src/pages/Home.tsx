import { useState, useEffect } from 'react';
import {Dropdown, Button} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import {cats} from '../constants/cats';

const Home = () => {

  const [photos, setPhotos] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if(location.state) {
      
      const { state } = location;
      console.log('state home', state)

      getPhotos(state.breed_id)
    }
  }, [location]);

  const getPhotos = (eventKey) => {
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


  const viewDetails = (id) => {
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
        /*console.log('data', data)
        setPhotos(data);*/
      })
      .catch(error => console.error(error));
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
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
      <>
          {
            photos.map(p => 
              <div >
                <img src={p.url} width="200" height="200"></img>
                <Button variant="primary" size="lg" onClick={() => {viewDetails(p.id)}}>
                  View Details
                </Button>
              </div>
            )
          }
      </>
    </>
    
  )
}

export default Home