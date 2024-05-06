import React, { useState, useEffect } from 'react';
import { ARExperience } from './Experience';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ARExperience } from './Experience'; // Asegúrate de importar tu clase ARExperience y la función loadObjects
import { useParams } from 'react-router-dom';
import { NgrokUrl } from "./NgrokUrl";

const ARComponents = () => {
    const [arExperience, setARExperience] = useState(null);
    const [error, setError] = useState('');
    const [mtlUrl, setMtlUrl] = useState('');
    const [objUrl, setObjUrl] = useState('');
    const [idUsuario, setIdUsuario] = useState(null);
    const {id_objeto} = useParams();


    const handleObjeto = async () => {
        try {
            const { data } = await axios.get(`http://localhost:2023/api/load-object/${id_objeto}`);
            setMtlUrl(data.mtlUrl);
            setObjUrl(data.objUrl);
            const userId = await fetchUserIdFromSceneId(id_objeto);
            setIdUsuario(userId);
        } catch (error) {
            setError('No se pudo conectar con el servidor');
        }
    };

    const fetchUserIdFromSceneId = async (id_objeto) => {
        try {
            const response = await axios.get(`http://localhost:2023/api/userAndProjects2/${id_objeto}`);
            return response.data.userId;
        } catch (error) {
            console.error('Error fetching user id:', error);
            return null;
        }
    };

    useEffect(() => {
        handleObjeto();
    }, [id_objeto]);

    const handleClickLoadModel = async () => {
        try {
            const experience = new ARExperience();
            await experience.loadModel(mtlUrl, objUrl);
            setARExperience(experience);
            experience.initScene();
            experience.setupARExperience();
        } catch (error) {
            console.error("Error al cargar el modelo:", error);
        }
    };

    return (
        <div className="container3D" style={{ width: "100%", height: "100vh" }}>
            <button onClick={handleClickLoadModel} className="botonAR">Cargar Modelo</button>
            <Link to={`/api/notas/${id_objeto}`} className="notas-button">Notas del proyecto</Link>
            {idUsuario !== null && (
                <Link to={`/projects/${idUsuario}`} className="return-button">Volver al inicio</Link>
            )}
        </div>
    );
};

export default ARComponents;
