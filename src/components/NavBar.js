// NavBar.js
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo1.png';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate de react-router-dom

export const NavBar = () => {
  const navigate = useNavigate();  // Obtener la función navigate
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

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
    // Aquí puedes agregar lógica de cierre de sesión si es necesario
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
            <Nav.Link href="#registroproyecto" className={activeLink === 'registroproyecto' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('registroproyecto')}>Registrar Proyecto</Nav.Link>
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
