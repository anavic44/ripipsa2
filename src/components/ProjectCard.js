import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export const ProjectCard = ({ Titulo, Empresa, imgUrl, id_objeto }) => {
  return (
   
  
     <Link to={`/ar/${id_objeto}`}>
      <div className="proj-imgbx">
      
        <img src={imgUrl} alt={Titulo} />
        
        <div className="proj-text">
          <h4>{Titulo}</h4>
          <span>{Empresa}</span>
        </div>

      </div>
      </Link>
   
    
    
  );
};
