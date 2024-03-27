import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import {cats} from '../constants/cats';

const Home = () => {

  const [photos, setPhotos] = useState([]);

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
        console.log('data', data)
        setPhotos(data);
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
              <div onClick={() => {viewDetails(p.id)}}>
                <img src={p.url} width="200" height="200"></img>
              </div>
            )
          }
      </>
    </>
    
  )
}

export default Home