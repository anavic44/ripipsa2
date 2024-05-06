import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ARExperience } from './Experience';
import { NgrokUrl } from './NgrokUrl';

const ARComponents = () => {
    const [modelDetails, setModelDetails] = useState([]);
    const [arExperience, setARExperience] = useState(null);
    const { id_escena } = useParams();  // Assumes `id_escena` is part of the URL parameter
    const [error, setError] = useState('');

    // Fetch model details based on scene (EscenaObjeto)
    useEffect(() => {
        const fetchModelDetails = async () => {
            try {
                const response = await axios.get(`https://${NgrokUrl}/api/EscenaObjeto?id_escena=${id_escena}`);
                const { data } = response;
                setModelDetails(data.map(item => ({
                    objPath: item.objUrl,
                    mtlPath: item.mtlUrl,
                    userId: item.id_usuario,  // Keeping user ID in the model detail
                })));
            } catch (error) {
                console.error('Error fetching model details:', error);
                setError('No se pudo conectar con el servidor');
            }
        };

        fetchModelDetails();
    }, [id_escena]);

    // Initialize or reinitialize ARExperience when modelDetails change
    useEffect(() => {
        if (modelDetails.length > 0 && !arExperience) {
            const experience = new ARExperience(modelDetails);
            experience.initScene();
            experience.setupARExperience();
            setARExperience(experience);

            // Cleanup function to handle component unmount
            return () => {
                experience.cleanUp();
            };
        }
    }, [modelDetails]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container3D" style={{ width: "100%", height: "100vh" }}>
            {modelDetails.map((detail, index) => (
                <button key={index} onClick={() => arExperience.setActiveObject(index)}>
                    Load Model {index + 1}
                </button>
            ))}
            <Link to={`/api/notas/${id_escena}`} className="notas-button">Notas del proyecto</Link>
        </div>
    );
};

export default ARComponents;
