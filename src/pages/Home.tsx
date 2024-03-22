import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import {cats} from '../constants/cats';

const Home = () => {

  console.log('cats', cats);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          cats.map(c => 
            <Dropdown.Item href="#/action-1">
              {c.breed_name}
            </Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Home