import React from 'react';
import { Col, Container, Tab, Row, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import TrackVisibility from 'react-on-screen';
import ColorSharp2 from "../assets/img/color-sharp2.png";
import { NavBar } from './NavBar';  // Asegúrate de que la ruta es correcta
import 'animate.css';
import { ProjectCard } from "./ProjectCard";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const Projects2 = () => {
    const [projects, setProjects] = useState([]);
    const [userData, setUserData] = useState(null);

    const {userId} = useParams ();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:2023/api/user/${userId}`);
                console.log("UserData:", data); // Verifica si los datos del usuario se están recibiendo correctamente
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchProjects = async () => {
            //const ids = [1, 2, 3, 4, 5, 6];  // IDs correspondientes a los objetos en la API
            //const projectFetches = (axios.get(`http://localhost:2023/api/load-all-objects`));
            
            try {
                
                const {data} = await(axios.get(`http://localhost:2023/api/userAndProjects/${userId}`));
                //const projectsData = responses.map(response => response.data);
                console.log(data.projects)

                setProjects(data.projects);
            } catch (error) {
                console.error("Error fetching project data: ", error);
            }
        };
        fetchUserData();
        fetchProjects();
    }, []);

    return (
        <div>
            <NavBar />  {/* Incorpora el NavBar al layout */}
            <section className="Project" id="projects">
                <Container>
                    <Row>
                        <Col size={12}>
                        <TrackVisibility>
                        {({ isVisible }) => (
                        <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
                            <h2>Proyectos de {userData ? userData.username : ""}</h2>
                            <p>Los proyectos disponibles para tu usuario son:</p>
                            <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content id="slideImUp" className={isVisible ? "animate_animated animate_slideInUp" : ""}>
                                    <Tab.Pane eventKey="first">
                                        <Row>
                                            {projects.map((project) => (
                                                
                                                <ProjectCard 
                                                    key={project.id_objeto}
                                                    {...project}
                                                />
                                                
                                            ))}
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="section">
                                        <p>Agrega mas proyectos</p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <p>Agrega mas proyectos</p>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                        )}
                        </TrackVisibility>
                        </Col>
                    </Row>
                </Container>
                <img className="background-image-right" src={ColorSharp2} alt="Decorative"></img>
            </section>
        </div>
    );
};
