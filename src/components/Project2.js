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
    const [projects, setProjects] = useState([{Titulo:"loading...", Empresa:"loading...", imgUrl:"loading...", id_objeto:"loading..."}]);
    const [userData, setUserData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedScene, setSelectedScene] = useState(null);
    const [scenes, setScenes] = useState([]);
    const [proyecto, setProyecto] = useState(0);
    const [update, setUpdate] = useState(false);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`https://${NgrokUrl}/api/user/${userId}`);
                if (userResponse.data) {
                    setUserData(userResponse.data);
                }

                const scenesResponse = await axios.get(`https://${NgrokUrl}/api/Escena/${userId}`);
                if (Array.isArray(scenesResponse.data)) {
                    setScenes(scenesResponse.data);
                } else {
                    console.error("Received non-array scenes data");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (selectedScene) {
            const fetchProjects = async () => {
                try {
                    const response = await axios.get(`https://${NgrokUrl}/api/userAndProjects/${selectedScene}`);
                    if (Array.isArray(response.data.projects)) {
                        setProjects(response.data.projects);
                    } else {
                        console.error("Received non-array projects data");
                    }
                } catch (error) {
                    console.error("Error fetching project data:", error);
                }
            };
            fetchProjects();
        }
    }, [selectedScene]);

    const handleSceneSelection = (e) => {
        setSelectedScene(e.target.value);
    };

    return (
        <div>
            <NavBar />
            <section className="Project" id="projects">
                <Container>
                    <Row>
                        <Col size={12}>
                            <TrackVisibility>
                                {({ isVisible }) => (
                                    <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
                                        {userData && userData.username ? (
                                            <>
                                                <h2>Proyectos de {userData.username}</h2>
                                                <p>Selecciona una escena para cargar los proyectos correspondientes:</p>
                                                <Form>
                                                    <Form.Group controlId="sceneSelection">
                                                        <Form.Label>Escena</Form.Label>
                                                        <Form.Control as="select" value={selectedScene} onChange={handleSceneSelection}>
                                                            {scenes.map((scene) => <option key={scene.id} value={scene.id}>{scene.title}</option>)}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form>
                                            </>
                                        ) : "Cargando..."}
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
                                            <Tab.Content>
                                                {projects.map((project, index) => (
                                                    <Tab.Pane eventKey={`tab-${index}`}>
                                                        <ProjectCard key={project.id_objeto} {...project} />
                                                    </Tab.Pane>
                                                ))}
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
export const Projects2 = () => {
    const [projects, setProjects] = useState([{Titulo:"loading...", Empresa:"loading...", imgUrl:"loading...", id_objeto:"loading..."}]);
    const [userData, setUserData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [proyecto, setProyecto] = useState(0);
    const [update, setUpdate]= useState(false);

    const {userId} = useParams ();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`https://${NgrokUrl}/api/user/${userId}`);
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
                
                const {data} = await(axios.get(`https://${NgrokUrl}/api/userAndProjects/${userId}`));
                //const projectsData = responses.map(response => response.data);
                console.log(data)

                if(data.projects){setProjects(data.projects || []);}
            } catch (error) {
                console.error("Error fetching project data: ", error);
            }
        };
        fetchUserData();
        fetchProjects();
    }, [update]);

    const handleSelectProject = async () => {
   console.log(userId, proyecto)
    const id_usuario = parseInt(userId, 10);
    const id_objeto =proyecto
    console.log(id_objeto, id_usuario)
        try {
          
            await axios.delete(`https://${NgrokUrl}/api/EscenaObjeto`, {
                data: {
                    id_usuario: id_usuario,
                    id_objeto: id_objeto
                }
            });
          console.log("Proyecto eliminado")
          setUpdate(!update)
        } catch (error) {
          console.error('Error delete', error);
        }
      };

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        
    };
    
      const proyectoUpdate = (id) => {
        setProyecto((current) => current*0+id)
      }
    

    return (
        <div>
            <NavBar />  {/* Incorpora el NavBar al layout }
            <section className="Project" id="projects">
                <Container>
                    <Row>
                        <Col size={12}>
                        <TrackVisibility>
                        {({ isVisible }) => (
                        <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
                          {userData && userData.username ? (
                            <>
                                <h2>Proyectos de {userData.username}</h2>
                                <p>Los proyectos disponibles para tu usuario son:</p>
                            </>
                            ) : null}

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
                                        <button onClick = {
                                            
                                            () => {
                                                  handleSelectProject()}
                                          }style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none' }}> Borrar Proyecto</button>
                                           
                                            {projects.map((project) => (
                                                <Col xs={12} sm={6} md={4} key={project.id_objeto}>
                                                <ProjectCard 
                                                    
                                                    {...project}

                                                />
                                                <label>
                                              <input
                                                  type="radio"
                                                  name="radioGroup"
                                                  value={project.Titulo}
                                                  checked={selectedValue === project.Titulo}
                                                  onChange={(e)=> {handleChange(e)
                                                    proyectoUpdate(project.id_objeto)
                                                  }}

                                              />
                                              {project.Titulo}
                                          </label>
                                                </Col>
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
                {/* <img className="background-image-right" src={ColorSharp2} alt="Decorative"></img> }
            </section>
        </div>
    );
};
*/