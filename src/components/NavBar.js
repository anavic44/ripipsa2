// NavBar.js
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo1.png';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate de react-router-dom
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


export const NavBar = () => {
  const navigate = useNavigate();  // Obtener la función navigate
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const user_id = (Cookies.get('user_id'));
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const handleLogout = () => {
    Cookies.remove("user_id")
    navigate('/');  // Navegar a la ruta de login
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Nav.Link href="#registroproyecto" className={activeLink === 'registroproyecto' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('registroproyecto')}>Registrar Proyecto</Nav.Link> */}
            
            <Nav.Link as={Link} to={`/registrar-proyecto/${user_id}`} className={activeLink === 'registrar-proyecto' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('registrar-proyecto')}>Registrar Proyecto</Nav.Link>
          </Nav>
          <span className="navbar-text">
            
            <button className="vvd" onClick={handleLogout}>
              <span>Log Out</span>
            </button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
