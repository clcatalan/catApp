import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {Home, SingleCat} from './pages';


const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">
          Home
        </Link>

        <Link to="/single-cat">
          Single Cat
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/single-cat" element={<SingleCat />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
