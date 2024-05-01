import { Col, Container, Tab, Row, Nav } from "react-bootstrap"
import { ProjectCard } from "./ProjectCard"
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import ColorSharp2 from "../assets/img/color-sharp2.png";
import MesaImg from "../imagenes/MesaDeTrabajo.png";
import CanaletaImg from "../imagenes/ImagenCanaleta.png";
import PanelCImg from "../imagenes/PanelCajon.png";
import PortaMonitorImg from "../imagenes/PortaMonitor.png";
import PortaScannerAluminio from "../imagenes/PortaScannerAluminio.png";
import CajonIMG from "../imagenes/Cajon.png";
import { isVisible } from "@testing-library/user-event/dist/utils";



export const Projects2 = () => {
    
    const projects = [
        {
            Titulo: "MesaDeTrabajo",
            Empresa: "Ripipsa",
            imgUrl: MesaImg,
        },
        {
            Titulo: "Canaleta",
            Empresa: "Ripipsa",
            imgUrl: CanaletaImg,
        },
        {
            Titulo: "PanelCajon",
            Empresa: "Ripipsa",
            imgUrl: PanelCImg,
        },
        {
            Titulo: "PortaMonitor",
            Empresa: "Ripipsa",
            imgUrl: PortaMonitorImg,
        },
        {
            Titulo: "Cajon",
            Empresa: "Ripipsa",
            imgUrl: CajonIMG,
        },
        {
            Titulo: "PortaScannerAluminio",
            Empresa: "Ripipsa",
            imgUrl: PortaScannerAluminio,
        },
        
    ]

    return (
        <section className="Project" id= "projects">
            <Container>
                <Row>
                    <Col size={12}> 
                    <TrackVisibility>
                    {({ isVisible }) => (
                    <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
                        <h2>Proyectos</h2>
                        <p>Los proyectos disponibles para tu usuario son: </p>
                        <Tab.Container id = "projects-tabs" defaultActiveKey={"first"}>
                            <Nav variant = "pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Tab 3 </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content id = "slideImUp" className={isVisible? "animate_animated animate_slideInUp": ""}>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                        {
                                            projects.map((project, index) => {
                                                return(
                                                    <ProjectCard 
                                                    key={index}
                                                    {...project}
                                                    />
                                                )
                                            })
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="section">
                                    <p>No se que es esto 1</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <p>No se que es esto 2</p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                    )}
                    </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={ColorSharp2}></img>
        </section>

    )
}