import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export const ProjectCard = ({ Titulo, Empresa, imgUrl, id_escena }) => {
  return (
   
  
     <Link to={`/ar/${id_escena}`}>
      <div className="proj-imgbx">
      
        <img src={imgUrl} alt={Titulo} />
        
        <div className="proj-text">
          <h4>Escena {id_escena}</h4>
          <span>{Empresa}</span>
        </div>

      </div>
      </Link>
   
    
    
  );
};
