import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import TrackVisibility from 'react-on-screen';
import { NavBar } from './NavBar';
import 'animate.css';
import { ProjectCard } from "./ProjectCard";
import { Col, Container, Tab, Row, Nav, Form } from "react-bootstrap";
import { NgrokUrl } from './NgrokUrl';

export const Projects2 = () => {
    const [projects, setProjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const [scenes, setScenes] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return; // Ensure userId is present
            try {
                // Fetch user data and scenes
                const userResponse = await axios.get(`https://${NgrokUrl}/api/user/${userId}`);
                if (userResponse.data) {
                    setUserData(userResponse.data);
                }
                // Fetch scenes for the user
                const scenesResponse = await axios.get(`https://${NgrokUrl}/api/Escena/${userId}`);
                if (Array.isArray(scenesResponse.data)) {
                    setScenes(scenesResponse.data);
                } else {
                    console.error("Received non-array scenes data");
                }
                // Fetch all projects for the user directly without waiting for scene selection
                const projectsResponse = await axios.get(`https://${NgrokUrl}/api/userAndProjects/${userId}`);
                if (Array.isArray(projectsResponse.data.projects)) {
                    setProjects(projectsResponse.data.projects);
                } else {
                    console.error("Received non-array projects data");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div>
            <NavBar />
            <section className="Project" id= "projects">
                <Container>
                    <Row> 
                        <Col size={12}> 
                        <TrackVisibility>  
                        {({ isVisible }) => (
                        <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
                            {userData ? (
                            <> 
                                <h2>Proyectos de {userData.username}</h2>
                                <p>Selecciona una escena para ver detalles específicos:</p>
                            </>
                            ) : (
                                <p>Cargando información del usuario...</p>
                            )}
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
                                            {projects.map((project, index) => (
                                            <Col key={index} xs={12} sm={6} md={4}>
                                                <ProjectCard {...project} />
                                                </Col>
                                            ))}
                                        </Row>                           
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
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
                
            </section>
        </div>
    );
};



/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import TrackVisibility from 'react-on-screen';
import { NavBar } from './NavBar';
import 'animate.css';
import { ProjectCard } from "./ProjectCard";
import { Col, Container, Tab, Row, Nav, Form } from "react-bootstrap";
import { NgrokUrl } from './NgrokUrl';

export const Projects2 = () => {
    const [projects, setProjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const [scenes, setScenes] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return; // Ensure userId is present
            try {
                // Fetch user data and scenes
                const userResponse = await axios.get(`https://${NgrokUrl}/api/user/${userId}`);
                if (userResponse.data) {
                    setUserData(userResponse.data);
                }
                // Fetch scenes for the user
                const scenesResponse = await axios.get(`https://${NgrokUrl}/api/Escena/${userId}`);
                if (Array.isArray(scenesResponse.data)) {
                    setScenes(scenesResponse.data);
                } else {
                    console.error("Received non-array scenes data");
                }
                // Fetch all projects for the user directly without waiting for scene selection
                const projectsResponse = await axios.get(`https://${NgrokUrl}/api/userAndProjects/${userId}`);
                if (Array.isArray(projectsResponse.data.projects)) {
                    setProjects(projectsResponse.data.projects);
                } else {
                    console.error("Received non-array projects data");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);
    return (
        <div>
            <NavBar />
            <Container className="Project">
                {userData && (
                    <>
                        <h2>Proyectos de {userData.username}</h2>
                        <p>Selecciona una escena para ver detalles específicos:</p>
                        <Form>
                            <Form.Group controlId="sceneSelection">
                                <Form.Label>Escena</Form.Label>
                                <Form.Control as="select" onChange={(e) => console.log('Scene selected:', e.target.value)}>
                                    {scenes.map(scene => <option key={scene.id} value={scene.id}>{scene.title}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </>
                )}
                <TrackVisibility>
                    {({ isVisible }) => (
                        <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
                            <Row>
                                {projects.map((project, index) => (
                                    <Col key={index} xs={12} sm={6} md={4}>
                                        <ProjectCard {...project} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                </TrackVisibility>
            </Container>
        </div>
    );
};

*/