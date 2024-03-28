import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import {Home, SingleCat} from './pages';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Cat Browser</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
